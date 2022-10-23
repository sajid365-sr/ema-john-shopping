
import React, { Children, createContext } from 'react';


export const AuthContext = createContext();

const UserContext = ({children}) => {

    const authInfo = {};

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default UserContext;