import CryptoJS from 'crypto-js';
import { env } from '../config/env.validation';

/**
 * Encryption service for handling sensitive data in NEXUS.DAWN
 * Uses AES-256 encryption with a secure key derived from environment variables
 */
export class EncryptionService {
  private static readonly key = CryptoJS.enc.Utf8.parse(env.REACT_APP_ENCRYPTION_KEY);

  /**
   * Encrypts sensitive data using AES-256
   * @param data - The data to encrypt
   * @returns Encrypted data as a string
   */
  static encrypt(data: string | object): string {
    const dataToEncrypt = typeof data === 'object' ? JSON.stringify(data) : data;
    const iv = CryptoJS.lib.WordArray.random(16);
    const encrypted = CryptoJS.AES.encrypt(dataToEncrypt, this.key, {
      iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });
    
    // Combine IV and encrypted data
    return iv.concat(encrypted.ciphertext).toString(CryptoJS.enc.Base64);
  }

  /**
   * Decrypts previously encrypted data
   * @param encryptedData - The encrypted data string
   * @returns Decrypted data
   */
  static decrypt(encryptedData: string): string {
    try {
      // Extract IV and ciphertext
      const rawData = CryptoJS.enc.Base64.parse(encryptedData);
      const iv = CryptoJS.lib.WordArray.create(rawData.words.slice(0, 4));
      const ciphertext = CryptoJS.lib.WordArray.create(rawData.words.slice(4));

      const decrypted = CryptoJS.AES.decrypt(
        CryptoJS.lib.CipherParams.create({ ciphertext }),
        this.key,
        {
          iv,
          mode: CryptoJS.mode.CBC,
          padding: CryptoJS.pad.Pkcs7
        }
      );

      return decrypted.toString(CryptoJS.enc.Utf8);
    } catch (error) {
      console.error('Decryption failed:', error);
      throw new Error('Failed to decrypt data');
    }
  }

  /**
   * Securely hashes data (one-way encryption)
   * @param data - The data to hash
   * @returns Hashed data as a string
   */
  static hash(data: string): string {
    return CryptoJS.SHA256(data).toString();
  }

  /**
   * Generates a secure random token
   * @param length - Length of the token in bytes
   * @returns Random token as a hex string
   */
  static generateToken(length: number = 32): string {
    return CryptoJS.lib.WordArray.random(length).toString();
  }

  /**
   * Securely compares two strings in constant time
   * @param a - First string
   * @param b - Second string
   * @returns Whether the strings are equal
   */
  static secureCompare(a: string, b: string): boolean {
    const aWords = CryptoJS.enc.Utf8.parse(a).words;
    const bWords = CryptoJS.enc.Utf8.parse(b).words;
    
    if (aWords.length !== bWords.length) {
      return false;
    }

    let result = 0;
    for (let i = 0; i < aWords.length; i++) {
      result |= aWords[i] ^ bWords[i];
    }
    
    return result === 0;
  }
} 