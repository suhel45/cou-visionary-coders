import crypto from 'crypto';

/**
 * Generates a secure random token.
 * @param length - The length of the token (default is 32).
 * @returns A secure random token as a string.
 */
export const generateToken = (length: number = 32): string => {
  return crypto.randomBytes(length).toString('hex');
};
