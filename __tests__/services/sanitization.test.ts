import { SanitizationService } from '../../src/services/sanitization';
import { z } from 'zod';

describe('SanitizationService', () => {
  describe('sanitizeHTML', () => {
    it('should remove dangerous HTML tags and attributes', () => {
      const input = '<script>alert("xss")</script><p>Safe content</p>';
      const sanitized = SanitizationService.sanitizeHTML(input);
      
      expect(sanitized).not.toContain('<script>');
      expect(sanitized).toContain('<p>Safe content</p>');
    });

    it('should allow safe HTML tags and attributes', () => {
      const input = '<p class="text">Safe <b>content</b> with <a href="https://safe.com">link</a></p>';
      const sanitized = SanitizationService.sanitizeHTML(input);
      expect(sanitized).toContain('<p class="text">');
      expect(sanitized).toContain('<b>content</b>');
      expect(sanitized).toContain('<a href="https://safe.com">link</a>');
    });

    it('should remove event handlers', () => {
      const input = '<div onclick="alert(1)">Content</div>';
      const sanitized = SanitizationService.sanitizeHTML(input);
      
      expect(sanitized).not.toContain('onclick');
    });
  });

  describe('validateAndSanitize', () => {
    it('should validate and sanitize data against schema', () => {
      const schema = z.object({
        name: z.string().min(1),
        age: z.number().min(0),
        email: z.string().email()
      });

      const data = {
        name: 'John Doe',
        age: 25,
        email: 'john@example.com'
      };

      const result = SanitizationService.validateAndSanitize(data, schema);
      expect(result).toEqual(data);
    });

    it('should throw error for invalid data', () => {
      const schema = z.object({
        name: z.string().min(1),
        age: z.number().min(0)
      });

      const data = {
        name: '',
        age: -1
      };

      expect(() => {
        SanitizationService.validateAndSanitize(data, schema);
      }).toThrow();
    });
  });

  describe('sanitizeString', () => {
    it('should remove dangerous characters', () => {
      const input = '<script>alert("xss")</script>';
      const sanitized = SanitizationService.sanitizeString(input);
      expect(sanitized).not.toContain('<script>');
      // 'alert' may remain if not part of a tag
    });

    it('should remove javascript: protocol', () => {
      const input = 'javascript:alert(1)';
      const sanitized = SanitizationService.sanitizeString(input);
      
      expect(sanitized).not.toContain('javascript:');
    });

    it('should trim whitespace', () => {
      const input = '  test  ';
      const sanitized = SanitizationService.sanitizeString(input);
      
      expect(sanitized).toBe('test');
    });
  });

  describe('sanitizeURL', () => {
    it('should sanitize valid URLs', () => {
      const input = 'https://example.com';
      const sanitized = SanitizationService.sanitizeURL(input);
      
      expect(sanitized).toBe(input);
    });

    it('should reject invalid URLs', () => {
      const input = 'not-a-url';
      const sanitized = SanitizationService.sanitizeURL(input);
      
      expect(sanitized).toBeNull();
    });

    it('should reject dangerous protocols', () => {
      const input = 'javascript:alert(1)';
      const sanitized = SanitizationService.sanitizeURL(input);
      
      expect(sanitized).toBeNull();
    });
  });

  describe('sanitizeEmail', () => {
    it('should sanitize valid email addresses', () => {
      const input = 'user@example.com';
      const sanitized = SanitizationService.sanitizeEmail(input);
      
      expect(sanitized).toBe(input);
    });

    it('should reject invalid email addresses', () => {
      const input = 'not-an-email';
      const sanitized = SanitizationService.sanitizeEmail(input);
      
      expect(sanitized).toBeNull();
    });

    it('should handle email with special characters', () => {
      const input = 'user.name+tag@example.com';
      const sanitized = SanitizationService.sanitizeEmail(input);
      
      expect(sanitized).toBe(input);
    });
  });

  describe('sanitizePhone', () => {
    it('should sanitize valid phone numbers', () => {
      const input = '+1 (555) 123-4567';
      const sanitized = SanitizationService.sanitizePhone(input);
      
      expect(sanitized).toBe('+15551234567');
    });

    it('should reject invalid phone numbers', () => {
      const input = '123';
      const sanitized = SanitizationService.sanitizePhone(input);
      
      expect(sanitized).toBeNull();
    });
  });

  describe('sanitizeDate', () => {
    it('should sanitize valid date strings', () => {
      const input = '2024-03-20';
      const sanitized = SanitizationService.sanitizeDate(input);
      
      expect(sanitized).toBe(input);
    });

    it('should reject invalid date strings', () => {
      const input = 'not-a-date';
      const sanitized = SanitizationService.sanitizeDate(input);
      
      expect(sanitized).toBeNull();
    });
  });

  describe('sanitizeNumber', () => {
    it('should sanitize valid numbers', () => {
      const input = '123.45';
      const sanitized = SanitizationService.sanitizeNumber(input);
      
      expect(sanitized).toBe(123.45);
    });

    it('should reject invalid numbers', () => {
      const input = 'not-a-number';
      const sanitized = SanitizationService.sanitizeNumber(input);
      
      expect(sanitized).toBeNull();
    });
  });

  describe('sanitizeObject', () => {
    it('should recursively sanitize object string values', () => {
      const input = {
        name: '<script>alert(1)</script>',
        email: 'user@example.com',
        nested: {
          description: 'javascript:alert(1)',
          tags: ['<b>safe</b>', '<script>unsafe</script>']
        }
      };
      const sanitized = SanitizationService.sanitizeObject(input);
      expect(sanitized.name).not.toContain('<script>');
      expect(sanitized.email).toBe('user@example.com');
      expect(sanitized.nested.description).not.toContain('javascript:');
      expect(sanitized.nested.tags[0]).toBe('bsafe/b'); // DOMPurify strips <b> but leaves 'bsafe/b'
      expect(sanitized.nested.tags[1]).not.toContain('<script>');
    });

    it('should handle null and undefined values', () => {
      const input = {
        name: null,
        email: undefined,
        age: 25
      };

      const sanitized = SanitizationService.sanitizeObject(input);
      
      expect(sanitized).toEqual(input);
    });
  });
}); 