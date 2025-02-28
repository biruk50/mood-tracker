'use client'
import React, { useState, useEffect, useContext, createContext } from 'react';
import { auth ,db} from '../firebase';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
const AuthContext = createContext();
 
export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {

    const [globalUser, setGlobalUser] = useState(null);
    const [globalData, setGlobalData]=useState(null);
    const [isLoading, setIsLoading]=useState(false);

    function signup(email, password) {
        return createUserWithEmailAndPassword(auth,email, password);
    }

    function login(email, password) {
        return signInWithEmailAndPassword(auth,email, password);
    }

    function logout() {
        setGlobalData(null);
        setGlobalUser(null);
        return  signOut(auth);
    }

    useEffect(() =>{
        const unsubscribe = onAuthStateChanged(auth, async (user) => {

        try {
            setIsLoading(true);
            setGlobalUser(user);
            if (!user) { return}
            
        }
        catch (error) { console.error(error);}
        finally {setIsLoading(false);}

        })

        return unsubscribe;
        
    }, [])

    const value= {}
    return(
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}