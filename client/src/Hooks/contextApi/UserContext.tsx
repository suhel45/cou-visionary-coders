import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  User,
  UserCredential,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import { createContext, ReactNode, useEffect, useState, useMemo } from 'react';
import { auth } from '../../components/firebase/Firebase.config';
import { UserProfile } from '../../interfaces/Signup.interface';

type authContextProps = {
  user: User | null;
  createUser: (email: string, password: string) => Promise<UserCredential>;
  updateUserProfile: (profile: UserProfile) => Promise<void>;
  loginUser: (email: string, password: string) => Promise<UserCredential>;
  logOut: () => Promise<void>;
  signInWithGoogle: () => Promise<UserCredential>;
  loading: boolean;
  valid: boolean;
  setValid: (value: boolean) => void;
};

export const AuthContext = createContext<authContextProps | null>(null);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState(false);
  const [valid, setValid] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const provider = new GoogleAuthProvider();

  const signInWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, provider);
  };

  const createUser = (email: string, password: string) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const loginUser = (email: string, password: string) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logOut = () => {
    setLoading(true);
    setValid(false);
    return signOut(auth);
  };

  const updateUserProfile = async (profile: UserProfile) => {
    if (auth.currentUser) {
      return await updateProfile(auth.currentUser, profile);
    } else {
      throw new Error('No authenticated user found');
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const authValue = useMemo(
    () => ({
      user,
      createUser,
      loginUser,
      logOut,
      updateUserProfile,
      signInWithGoogle,
      loading,
      valid,
      setValid,
    }),
    [user, loading, valid],
  );

  return (
    <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
