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
import axios from 'axios';
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
  isBackendAuthenticated: boolean;
  setIsBackendAuthenticated: (isAuthenticated: boolean) => void;
  refreshUser: () => Promise<void>;
  deleteUser: (user: User) => Promise<void>;
  isAdmin: boolean;
};

export const AuthContext = createContext<authContextProps | null>(null);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [initializing, setInitializing] = useState(true);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isNewlyRegistered, setIsNewlyRegistered] = useState(false);
  const [isBackendAuthenticated, setIsBackendAuthenticated] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const provider = new GoogleAuthProvider();

  //  Fetch admin status from backend
  const checkAdminStatus = async (email: string | null | undefined) => {
    if (!email) return;

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_BASE_URL}/api/auth/admin`,
        { withCredentials: true }
      );
      console.log("admin data", response.data.user);
      setIsAdmin(response.data?.user?.role === 'admin');
    } catch (error) {
      console.error('Error checking admin status:', error);
      setIsAdmin(false);
    }
  };

  const refreshUser = useCallback(async () => {
    try {
      const currentUser = auth.currentUser;
      if (currentUser) {
        await currentUser.getIdToken(true);
        setUser(currentUser);
        await checkAdminStatus(currentUser.email); 
      }
    } catch (error) {
      console.error('User refresh error:', error);
      setUser(null);
      setIsAdmin(false);
    }
  }, []);

  const authenticateWithPersistence = async (
    authMethod: () => Promise<UserCredential>,
  ) => {
    try {
      await setPersistence(auth, browserLocalPersistence);
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
      setIsNewlyRegistered(true);
      return userCredential;
    });
  };

  const deleteUser = async (user: User) => {
    try {
      setLoading(true);
      await firebaseDeleteUser(user);
      if (user.uid === auth.currentUser?.uid) {
        setUser(null);
        setIsNewlyRegistered(false);
        setIsAdmin(false);
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
      setIsNewlyRegistered(false);
      return signInWithEmailAndPassword(auth, email, password);
    });
  };

  const logOut = async () => {
    try {
      setLoading(true);
      await signOut(auth);
      setUser(null);
      setIsNewlyRegistered(false);
      setIsAdmin(false);
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setLoading(false);
    }
  };
  console.log(isAdmin)
  const updateUserProfile = async (profile: UserProfile) => {
    if (auth.currentUser) {
      try {
        await updateProfile(auth.currentUser, profile);
        await refreshUser();
      } catch (error) {
        console.error('Profile update error:', error);
        throw error;
      }
    } else {
      throw new Error('No authenticated user found');
    }
  };

  // Auth state listener + check admin status
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
            await currentUser.getIdToken(true);
            setUser(currentUser);
            await checkAdminStatus(currentUser.email);
          } catch (tokenError) {
            console.error('Token verification failed:', tokenError);
            setUser(null);
            setIsAdmin(false);
          }
        } else {
          setUser(null);
          setIsAdmin(false);
        }

        if (initializing) {
          setInitializing(false);
        }
      },
      (error) => {
        console.error('Authentication State Change Error:', error);
        setUser(null);
        setIsAdmin(false);
        if (initializing) {
          setInitializing(false);
        }
      },
    );

    return () => unsubscribe();
  }, [initializing]);

  useEffect(() => {
    const checkUserAuthentication = async () => {
      if (user) {
        try {
          await refreshUser();
        } catch (error) {
          console.error('Periodic user check failed:', error);
          setUser(null);
          setIsAdmin(false);
        }
      }
    };

    const intervalId = setInterval(checkUserAuthentication, 5 * 60 * 1000);

    return () => clearInterval(intervalId);
  }, [user, refreshUser]);

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
      isBackendAuthenticated,
      setIsBackendAuthenticated,
      deleteUser,
      isAdmin, 
    }),
    [
      user,
      loading,
      initializing,
      refreshUser,
      isNewlyRegistered,
      isBackendAuthenticated,
      isAdmin,
    ]
  );

  if (initializing) {
    return <Loading message="please wait..." />;
  }

  return (
    <AuthContext.Provider value={authValue}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
