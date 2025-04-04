interface IFormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface UserProfile {
  displayName: string;
}

export type { IFormData, UserProfile };
