import { createContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import app from "../firebase/firebase.config";

export const AuthContext = createContext()
const auth = getAuth(app);

// eslint-disable-next-line react/prop-types
const AuthProviders = ({children}) => {

  const [user, setUser] =useState()
  const [loading, setLoading] = useState(true)


  const createUser = (email, password) =>{
    setLoading(true)
    return createUserWithEmailAndPassword(auth, email, password)
  }

  const signIn = (email, password) =>{
    setLoading(true)
    return signInWithEmailAndPassword(auth, email, password)
  }
  const logOut = () =>{
    return signOut(auth)
  }

  useEffect(() =>{
    const unsubscribe = onAuthStateChanged(auth, currentUser =>{
      setUser(currentUser)
      setLoading(false)
    }) 
    return() =>{
      return unsubscribe()
    } 
  }, [])

    const userInfo = {
        user,
        loading,
        createUser,
        signIn,
        logOut,

    }
    return (
      <AuthContext.Provider value={userInfo}>
            {children}
      </AuthContext.Provider>
    );
};

export default AuthProviders;