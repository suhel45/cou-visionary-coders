import { generateToken } from '../../utils/token.util';
import crypto from 'crypto';

jest.mock('crypto');

describe('generateToken', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should generate a token of default length 32 bytes (64 hex chars)', () => {
    // Arrange
    const fakeBuffer = Buffer.from('a'.repeat(32));
    (crypto.randomBytes as jest.Mock).mockReturnValue(fakeBuffer);

    // Act
    const token = generateToken();

    // Assert
    expect(crypto.randomBytes).toHaveBeenCalledWith(32);
    expect(typeof token).toBe('string');
    expect(token.length).toBe(64);
  });

  it('should generate a token of given byte length', () => {
    const length = 16;
    const fakeBuffer = Buffer.from('b'.repeat(length));
    (crypto.randomBytes as jest.Mock).mockReturnValue(fakeBuffer);

    const token = generateToken(length);

    expect(crypto.randomBytes).toHaveBeenCalledWith(length);
    expect(token.length).toBe(32); // 16 bytes * 2 hex chars
  });
});
