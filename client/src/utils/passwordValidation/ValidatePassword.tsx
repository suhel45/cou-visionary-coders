export const ValidatePassword = (password: string): string | null => {
  const validationRules = [
    { condition: password.length >= 8, message: 'at least 8 characters' },
    { condition: /[a-z]/.test(password), message: 'one lowercase letter' },
    { condition: /[A-Z]/.test(password), message: 'one uppercase letter' },
    { condition: /\d/.test(password), message: 'one number' },
    { condition: /[@#$!%*?&]/.test(password), message: 'one special character (e.g., @#$!%*?&)' }
  ];
  
  const failedValidations = validationRules
    .filter(rule => !rule.condition)
    .map(rule => rule.message);
  
  return failedValidations.length > 0 
    ? `Password must include ${failedValidations.join(', ')}.` 
    : null;
};