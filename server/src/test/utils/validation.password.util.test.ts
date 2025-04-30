import { validatePassword } from '../../utils/validation.password.util';

describe('validatePassword', () => {
  it('should return null for a valid password', () => {
    const result = validatePassword('Abcd1234@');
    expect(result).toBeNull();
  });

  it('should detect missing length', () => {
    const result = validatePassword('A1@a');
    expect(result).toContain('at least 8 characters');
  });

  it('should detect missing lowercase letter', () => {
    const result = validatePassword('ABCD1234@');
    expect(result).toContain('one lowercase letter');
  });

  it('should detect missing uppercase letter', () => {
    const result = validatePassword('abcd1234@');
    expect(result).toContain('one uppercase letter');
  });

  it('should detect missing number', () => {
    const result = validatePassword('Abcdefg@');
    expect(result).toContain('one number');
  });

  it('should detect missing special character', () => {
    const result = validatePassword('Abcd1234');
    expect(result).toContain('one special character');
  });

  it('should list all missing requirements for weak password', () => {
    const result = validatePassword('abc');
    expect(result).toContain('at least 8 characters');
    expect(result).toContain('one uppercase letter');
    expect(result).toContain('one number');
    expect(result).toContain('one special character');
  });
});
