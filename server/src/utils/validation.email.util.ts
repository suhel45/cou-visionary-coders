import validator from 'validator';

/**
 * Validates an email address.
 * @param email - The email address to validate.
 * @returns A string with an error message if invalid, or null if valid.
 */
export const validateEmail = (email: string): string | null => {
  if (!email) {
    return 'Email is required.';
  }

  if (!validator.isEmail(email)) {
    return 'Invalid email format.';
  }

  return null; // Email is valid
};
