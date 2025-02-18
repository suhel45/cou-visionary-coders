import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
    User,
    UserCredential,
  } from "firebase/auth";
  import { createContext, ReactNode, useEffect, useState } from "react";
import { auth } from "../../components/firebase/Firebase.config";
  
type authContextProps = {
    user:User|null,
    createUser:(email:string,password:string)=>Promise<UserCredential>,
    loginUser:(email:string,password:string)=>Promise<UserCredential>,
    logOut:()=>Promise<void>,
    loading:boolean
}

  export const AuthContext = createContext<authContextProps | null>(null);
  
  const AuthProvider = ( { children }: { children: ReactNode; }) => {
    const [loading, setLoading] = useState(true);
    const [user,setUser] = useState<User|null>(null);
  
    const createUser = (email:string, password:string) => {
      setLoading(true);
      return createUserWithEmailAndPassword(auth, email, password);
    };
  
    const loginUser = (email:string, password:string) => {
      setLoading(true);
      return signInWithEmailAndPassword(auth, email, password);
    };
  
    const logOut = () => {
      setLoading(true);
      return signOut(auth);
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
  
    const authValue:authContextProps = {
      user,
      createUser,
      loginUser,
      logOut,
      loading,
    };
  
    return <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>;
  };
  
  export default AuthProvider;