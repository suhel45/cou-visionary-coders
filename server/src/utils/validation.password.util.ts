export const validatePassword = (password: string): string | null => {
  const errors: string[] = [];

  if (password.length < 8) {
    errors.push('at least 8 characters');
  }
  if (!/[a-z]/.test(password)) {
    errors.push('one lowercase letter');
  }
  if (!/[A-Z]/.test(password)) {
    errors.push('one uppercase letter');
  }
  if (!/\d/.test(password)) {
    errors.push('one number');
  }
  if (!/[@#$!%*?&]/.test(password)) {
    errors.push('one special character (e.g., @#$!%*?&)');
  }

  if (errors.length > 0) {
    return `Password must include ${errors.join(', ')}.`;
  }

  return null; // Password is valid
};
