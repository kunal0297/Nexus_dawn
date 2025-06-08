import * as faceapi from 'face-api.js';
import { FacialEmotion, FacialProcessingConfig } from '../types/voice';

export class FacialEmotionService {
  private config: FacialProcessingConfig;
  private videoElement: HTMLVideoElement | null = null;
  private isProcessing: boolean = false;
  private detectionInterval: number | null = null;

  constructor(config: Partial<FacialProcessingConfig>) {
    this.config = {
      model: 'faceapi',
      detectionInterval: 100, // ms
      minConfidence: 0.5,
      ...config
    };
  }

  async initialize(): Promise<void> {
    try {
      // Load FaceAPI models
      await Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
        faceapi.nets.faceExpressionNet.loadFromUri('/models')
      ]);
    } catch (error) {
      console.error('Error initializing FaceAPI:', error);
      throw new Error('Failed to initialize facial emotion detection');
    }
  }

  async startDetection(videoElement: HTMLVideoElement): Promise<void> {
    if (this.isProcessing) {
      return;
    }

    this.videoElement = videoElement;
    this.isProcessing = true;

    // Start detection loop
    this.detectionInterval = window.setInterval(
      () => this.detectEmotion(),
      this.config.detectionInterval
    );
  }

  stopDetection(): void {
    if (this.detectionInterval) {
      clearInterval(this.detectionInterval);
      this.detectionInterval = null;
    }
    this.isProcessing = false;
    this.videoElement = null;
  }

  private async detectEmotion(): Promise<FacialEmotion | null> {
    if (!this.videoElement) {
      return null;
    }

    try {
      const detections = await faceapi
        .detectAllFaces(this.videoElement, new faceapi.TinyFaceDetectorOptions())
        .withFaceExpressions();

      if (detections.length === 0) {
        return null;
      }

      // Get the most confident detection
      const detection = detections.reduce((prev, current) => {
        return (prev.detection.score > current.detection.score) ? prev : current;
      });

      // Convert FaceAPI expressions to our emotion format
      const expressions = detection.expressions;
      return {
        neutral: expressions.neutral,
        happy: expressions.happy,
        sad: expressions.sad,
        angry: expressions.angry,
        fearful: expressions.fearful,
        disgusted: expressions.disgusted,
        surprised: expressions.surprised,
        confidence: detection.detection.score
      };
    } catch (error) {
      console.error('Error detecting facial emotion:', error);
      return null;
    }
  }

  async requestCameraPermission(): Promise<boolean> {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      stream.getTracks().forEach(track => track.stop());
      return true;
    } catch (error) {
      console.error('Camera permission denied:', error);
      return false;
    }
  }
} 