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
  browserLocalPersistence,
  setPersistence,
  deleteUser as firebaseDeleteUser,
} from 'firebase/auth';
import {
  createContext,
  ReactNode,
  useEffect,
  useState,
  useMemo,
  useCallback,
} from 'react';
import { auth } from '../../components/firebase/Firebase.config';
import { UserProfile } from '../../interfaces/Signup.interface';
import Loading from '../../utils/Loading/Loading';

type authContextProps = {
  user: User | null;
  createUser: (email: string, password: string) => Promise<UserCredential>;
  updateUserProfile: (profile: UserProfile) => Promise<void>;
  loginUser: (email: string, password: string) => Promise<UserCredential>;
  logOut: () => Promise<void>;
  signInWithGoogle: () => Promise<UserCredential>;
  loading: boolean;
  initializing: boolean;
  isNewlyRegistered: boolean;
  refreshUser: () => Promise<void>;
  deleteUser: (user: User) => Promise<void>;
};

export const AuthContext = createContext<authContextProps | null>(null);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [initializing, setInitializing] = useState(true);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isNewlyRegistered, setIsNewlyRegistered] = useState(false);
  const provider = new GoogleAuthProvider();

  // Refresh user method
  const refreshUser = useCallback(async () => {
    try {
      const currentUser = auth.currentUser;
      if (currentUser) {
        // Force token refresh
        await currentUser.getIdToken(true);
        setUser(currentUser);
      }
    } catch (error) {
      console.error('User refresh error:', error);
      setUser(null);
    }
  }, []);

  // Authenticate with persistence
  const authenticateWithPersistence = async (
    authMethod: () => Promise<UserCredential>,
  ) => {
    try {
      // Ensure persistence is set
      await setPersistence(auth, browserLocalPersistence);

      // Perform authentication
      setLoading(true);
      const result = await authMethod();
      return result;
    } catch (error) {
      console.error('Authentication error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Authentication methods with persistence
  const signInWithGoogle = () => {
    return authenticateWithPersistence(() => signInWithPopup(auth, provider));
  };

  const createUser = (email: string, password: string) => {
    return authenticateWithPersistence(async () => {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      // Set this flag when user signs up
      setIsNewlyRegistered(true);
      return userCredential;
    });
  };

  const deleteUser = async (user: User) => {
    try {
      setLoading(true);
      await firebaseDeleteUser(user);
      // If the deleted user is the current user, update state
      if (user.uid === auth.currentUser?.uid) {
        setUser(null);
        setIsNewlyRegistered(false);
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const loginUser = (email: string, password: string) => {
    return authenticateWithPersistence(async () => {
      // Clear the flag during normal login
      setIsNewlyRegistered(false);
      return signInWithEmailAndPassword(auth, email, password);
    });
  };

  const logOut = async () => {
    try {
      setLoading(true);
      await signOut(auth);
      setUser(null);
      // Reset the flag when logging out
      setIsNewlyRegistered(false);
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateUserProfile = async (profile: UserProfile) => {
    if (auth.currentUser) {
      try {
        await updateProfile(auth.currentUser, profile);
        // Refresh user to ensure latest profile
        await refreshUser();
      } catch (error) {
        console.error('Profile update error:', error);
        throw error;
      }
    } else {
      throw new Error('No authenticated user found');
    }
  };

  // Authentication state listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      async (currentUser) => {
        console.log('Auth State Changed:', {
          user: currentUser,
          timestamp: new Date().toISOString(),
        });

        if (currentUser) {
          try {
            // Verify token to ensure authentication is still valid
            await currentUser.getIdToken(true);
            setUser(currentUser);
          } catch (tokenError) {
            console.error('Token verification failed:', tokenError);
            setUser(null);
          }
        } else {
          setUser(null);
        }

        // Mark initialization as complete
        if (initializing) {
          setInitializing(false);
        }
      },
      (error) => {
        console.error('Authentication State Change Error:', error);
        setUser(null);

        if (initializing) {
          setInitializing(false);
        }
      },
    );

    return () => unsubscribe();
  }, [initializing]);

  // Periodic user state verification
  useEffect(() => {
    const checkUserAuthentication = async () => {
      if (user) {
        try {
          await refreshUser();
        } catch (error) {
          console.error('Periodic user check failed:', error);
          setUser(null);
        }
      }
    };

    // Check user authentication every 5 minutes
    const intervalId = setInterval(checkUserAuthentication, 5 * 60 * 1000);

    return () => clearInterval(intervalId);
  }, [user, refreshUser]);

  // Memoized context value
  const authValue = useMemo(
    () => ({
      user,
      createUser,
      loginUser,
      logOut,
      updateUserProfile,
      signInWithGoogle,
      loading,
      initializing,
      refreshUser,
      isNewlyRegistered,
      deleteUser,
    }),
    [user, loading, initializing, refreshUser, isNewlyRegistered],
  );

  // Prevent rendering children during initialization
  if (initializing) {
    return <Loading message="please wait..." />
  }

  return (
    <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
