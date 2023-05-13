import { createContext, useEffect, useState } from "react";
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import app from "../firebase/firebase.config";

export const AuthContext = createContext()
const auth = getAuth(app);

// eslint-disable-next-line react/prop-types
const AuthProviders = ({children}) => {

  const [user, setUser] =useState()
  const [loading, setLoading] = useState(true)
  const provider = new GoogleAuthProvider();


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

  const googleSignIn = () =>{
    setLoading(true)
 return signInWithPopup(auth, provider)
  }
 
  useEffect(() =>{
    const unsubscribe = onAuthStateChanged(auth, currentUser =>{
      setUser(currentUser)
      setLoading(false)
      if(currentUser && currentUser.email){

        const loggerUser = {
          email: currentUser.email

        }
        fetch('https://car-doctor-server-gold.vercel.app/jwt',{
            method: 'POST',
            headers: {
              'content-type' : 'application/json'
            },
            body: JSON.stringify(loggerUser)
          })
          .then(res => res.json())
          .then(data => {
            console.log(data);
          
          localStorage.setItem('car-access-Itmes' , data.token)
          }
          )
      }
      else{
        localStorage.removeItem('car-access-Itmes')
      }
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
        googleSignIn,

    }
    return (
      <AuthContext.Provider value={userInfo}>
            {children}
      </AuthContext.Provider>
    );
};

export default AuthProviders;