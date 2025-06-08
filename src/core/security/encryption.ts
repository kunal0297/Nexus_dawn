import crypto from 'crypto';

const ALGORITHM = 'aes-256-gcm';
const IV_LENGTH = 16;
const SALT_LENGTH = 64;
const TAG_LENGTH = 16;
const KEY_LENGTH = 32;
const ITERATIONS = 100000;

/**
 * Encrypts data using AES-256-GCM
 */
export async function encrypt(data: string, key: string): Promise<string> {
  // Generate a random initialization vector
  const iv = crypto.randomBytes(IV_LENGTH);
  
  // Generate a random salt
  const salt = crypto.randomBytes(SALT_LENGTH);
  
  // Derive key using PBKDF2
  const derivedKey = crypto.pbkdf2Sync(
    key,
    salt,
    ITERATIONS,
    KEY_LENGTH,
    'sha512'
  );
  
  // Create cipher
  const cipher = crypto.createCipheriv(ALGORITHM, derivedKey, iv);
  
  // Encrypt the data
  const encrypted = Buffer.concat([
    cipher.update(data, 'utf8'),
    cipher.final()
  ]);
  
  // Get auth tag
  const tag = cipher.getAuthTag();
  
  // Combine all components
  const result = Buffer.concat([
    salt,
    iv,
    tag,
    encrypted
  ]);
  
  return result.toString('base64');
}

/**
 * Decrypts data using AES-256-GCM
 */
export async function decrypt(encryptedData: string, key: string): Promise<string> {
  // Convert from base64
  const buffer = Buffer.from(encryptedData, 'base64');
  
  // Extract components
  const salt = buffer.slice(0, SALT_LENGTH);
  const iv = buffer.slice(SALT_LENGTH, SALT_LENGTH + IV_LENGTH);
  const tag = buffer.slice(SALT_LENGTH + IV_LENGTH, SALT_LENGTH + IV_LENGTH + TAG_LENGTH);
  const encrypted = buffer.slice(SALT_LENGTH + IV_LENGTH + TAG_LENGTH);
  
  // Derive key using PBKDF2
  const derivedKey = crypto.pbkdf2Sync(
    key,
    salt,
    ITERATIONS,
    KEY_LENGTH,
    'sha512'
  );
  
  // Create decipher
  const decipher = crypto.createDecipheriv(ALGORITHM, derivedKey, iv);
  decipher.setAuthTag(tag);
  
  // Decrypt the data
  const decrypted = Buffer.concat([
    decipher.update(encrypted),
    decipher.final()
  ]);
  
  return decrypted.toString('utf8');
} 