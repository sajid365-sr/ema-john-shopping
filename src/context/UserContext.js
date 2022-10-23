
import React, { createContext, useState } from 'react';
import {createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut} from 'firebase/auth';
import app from '../firebase/firebase.config'


export const AuthContext = createContext();
const auth = getAuth(app)

const UserContext = ({children}) => {

    const [user, setUser] = useState(null);

    // create user
    const createUser = (email, password) =>{
        return createUserWithEmailAndPassword(auth, email, password);
    }
    
    // log in user
    const signIn = (email, password) =>{
        return signInWithEmailAndPassword(auth, email, password);
    }
    // log out
    const logOut = () =>{
        return signOut(auth);
    }
    
    const authInfo = { user, createUser, signIn, logOut };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default UserContext;