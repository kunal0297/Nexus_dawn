import DOMPurify from 'dompurify';
import { z } from 'zod';

/**
 * Service for sanitizing and validating user input in NEXUS.DAWN
 * Provides protection against XSS, injection attacks, and data validation
 */
export class SanitizationService {
  /**
   * Sanitizes HTML content to prevent XSS attacks
   * @param html - The HTML content to sanitize
   * @returns Sanitized HTML string
   */
  static sanitizeHTML(html: string): string {
    return DOMPurify.sanitize(html, {
      ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a', 'p', 'br', 'span'],
      ALLOWED_ATTR: ['href', 'target', 'rel', 'class']
    });
  }

  /**
   * Validates and sanitizes user input against a schema
   * @param data - The data to validate
   * @param schema - Zod schema for validation
   * @returns Sanitized and validated data
   */
  static validateAndSanitize<T>(data: unknown, schema: z.ZodSchema<T>): T {
    return schema.parse(data);
  }

  /**
   * Removes potentially dangerous characters from a string
   * @param input - The string to sanitize
   * @returns Sanitized string
   */
  static sanitizeString(input: string): string {
    return input
      .replace(/[<>]/g, '') // Remove angle brackets
      .replace(/javascript:/gi, '') // Remove javascript: protocol
      .replace(/on\w+=/gi, '') // Remove event handlers
      .trim();
  }

  /**
   * Sanitizes a URL to ensure it's safe
   * @param url - The URL to sanitize
   * @returns Sanitized URL or null if invalid
   */
  static sanitizeURL(url: string): string | null {
    try {
      const sanitized = this.sanitizeString(url);
      const parsed = new URL(sanitized);
      
      // Only allow http and https protocols
      if (!['http:', 'https:'].includes(parsed.protocol)) {
        return null;
      }
      
      return sanitized;
    } catch {
      return null;
    }
  }

  /**
   * Sanitizes an email address
   * @param email - The email to sanitize
   * @returns Sanitized email or null if invalid
   */
  static sanitizeEmail(email: string): string | null {
    const sanitized = this.sanitizeString(email);
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    
    return emailRegex.test(sanitized) ? sanitized : null;
  }

  /**
   * Sanitizes a phone number
   * @param phone - The phone number to sanitize
   * @returns Sanitized phone number or null if invalid
   */
  static sanitizePhone(phone: string): string | null {
    const sanitized = phone.replace(/[^\d+]/g, '');
    const phoneRegex = /^\+?[\d\s-]{10,}$/;
    
    return phoneRegex.test(sanitized) ? sanitized : null;
  }

  /**
   * Sanitizes a date string
   * @param date - The date string to sanitize
   * @returns Sanitized date string or null if invalid
   */
  static sanitizeDate(date: string): string | null {
    const sanitized = this.sanitizeString(date);
    const parsed = new Date(sanitized);
    
    return isNaN(parsed.getTime()) ? null : sanitized;
  }

  /**
   * Sanitizes a number
   * @param num - The number to sanitize
   * @returns Sanitized number or null if invalid
   */
  static sanitizeNumber(num: string): number | null {
    const sanitized = this.sanitizeString(num);
    const parsed = Number(sanitized);
    
    return isNaN(parsed) ? null : parsed;
  }

  /**
   * Sanitizes an object by recursively sanitizing its string values
   * @param obj - The object to sanitize
   * @returns Sanitized object
   */
  static sanitizeObject<T extends Record<string, any>>(obj: T): T {
    const sanitized: Record<string, any> = {};
    
    for (const [key, value] of Object.entries(obj)) {
      if (typeof value === 'string') {
        sanitized[key] = this.sanitizeString(value);
      } else if (typeof value === 'object' && value !== null) {
        sanitized[key] = this.sanitizeObject(value);
      } else {
        sanitized[key] = value;
      }
    }
    
    return sanitized as T;
  }
} 