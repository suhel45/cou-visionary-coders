import { validateEmail } from '../../utils/validation.email.util';
import validator from 'validator';

jest.mock('validator');

describe('validateEmail', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return error if email is empty', () => {
    const result = validateEmail('');
    expect(result).toBe('Email is required.');
  });

  it('should return error if email is invalid', () => {
    (validator.isEmail as jest.Mock).mockReturnValue(false);

    const result = validateEmail('invalid-email');
    expect(validator.isEmail).toHaveBeenCalledWith('invalid-email');
    expect(result).toBe('Invalid email format.');
  });

  it('should return null if email is valid', () => {
    (validator.isEmail as jest.Mock).mockReturnValue(true);

    const result = validateEmail('test@example.com');
    expect(validator.isEmail).toHaveBeenCalledWith('test@example.com');
    expect(result).toBeNull();
  });
});
