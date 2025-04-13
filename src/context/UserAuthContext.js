'use client'
import React, { createContext, useContext, useEffect, useState } from 'react'
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    sendPasswordResetEmail,
    signOut
} from "firebase/auth"

import { auth } from '@/config/firebase'

const UserAuthContext = createContext();

export default function UserAuthContextProvider({ children }) {

    const [user,setUser] = useState({})

    function login(email, password) {
        return signInWithEmailAndPassword(auth, email, password)
    }

    function signUp(email, password) {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    function resetPassword(email) {
        return sendPasswordResetEmail(auth, email)
    }

    function Logout() {
        return signOut(auth)
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth,(currentUser) => {
            console.log("Auth", currentUser)
            setUser(currentUser)
        })
        return () => {unsubscribe()}
    }, [])
  return (
    <UserAuthContext.Provider value={{user, login, signUp, resetPassword, Logout}}>
        {children}
    </UserAuthContext.Provider>
  )
}

export function useUserAuth() {
    return useContext(UserAuthContext)
}