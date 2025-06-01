import React, { useState, useEffect } from 'react';
import { useElevenLabs } from './hooks/useElevenLabs';
import './App.css';

function App() {
  const [text, setText] = useState('');
  const [selectedVoice, setSelectedVoice] = useState('');
  const { isSpeaking, error, speak, stop, voices, isLoadingVoices, loadVoices } = useElevenLabs();

  useEffect(() => {
    loadVoices();
  }, [loadVoices]);

  const handleSpeak = async () => {
    if (text && selectedVoice) {
      await speak(text, selectedVoice);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to Dawn Oracle</h1>
        <p>Your branching narrative system is running!</p>
        
        <div className="tts-container">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter text to speak..."
            rows={4}
            className="tts-input"
          />
          
          <select
            value={selectedVoice}
            onChange={(e) => setSelectedVoice(e.target.value)}
            className="voice-select"
            disabled={isLoadingVoices}
          >
            <option value="">Select a voice</option>
            {voices.map((voice) => (
              <option key={voice.voice_id} value={voice.voice_id}>
                {voice.name}
              </option>
            ))}
          </select>
          
          <div className="button-container">
            <button
              onClick={handleSpeak}
              disabled={!text || !selectedVoice || isSpeaking}
              className="speak-button"
            >
              {isSpeaking ? 'Speaking...' : 'Speak'}
            </button>
            
            <button
              onClick={stop}
              disabled={!isSpeaking}
              className="stop-button"
            >
              Stop
            </button>
          </div>
          
          {error && <p className="error-message">{error}</p>}
        </div>
      </header>
    </div>
  );
}

export default App; 