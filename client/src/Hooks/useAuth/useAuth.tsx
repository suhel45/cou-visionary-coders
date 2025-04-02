// hooks/useAuth.ts
import { useContext } from 'react';
import { AuthContext } from '../contextApi/UserContext';

export const useAuth = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error('AuthContext is null');
  }

  return authContext;
};
