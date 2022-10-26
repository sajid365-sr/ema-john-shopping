
import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/UserContext';

const PrivateRoute = ({children}) => {
    const {user, loading} = useContext(AuthContext);
    const location = useLocation();

    if(loading){
        return <h3>Loading</h3>
    }
    
    if(user && user.uid){
        return children;
    }
    return <Navigate to='/login' state={{ from: location }} replace ></Navigate>

};

export default PrivateRoute;