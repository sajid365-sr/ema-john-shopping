
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/UserContext';
import './Login.css'

const Login = () => {
    const {signIn, logOut } = useContext(AuthContext);
    
    const handleSubmit = (event) =>{
        event.preventDefault();
        let form = event.target;
        let email = form.email.value;
        let password = form.password.value;

        signIn(email,password)
        .then( (result) =>{
            const user = result.user;
            form.reset();
            console.log(user);
        })
        .catch(error => console.error(error));
    }

    return (
        <div className='form-container'>
            <h2 className='form-title'>Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-control">
                    <label htmlFor="email">Email</label>
                    <input type="email" name='email' placeholder='Enter email' required />
                </div>
                <div className="form-control">
                    <label htmlFor="password">Password</label>
                    <input type="password" name='password' placeholder='Enter password' required />
                </div>
                <input className='btn-submit' type="submit" value="Login" />
            </form>
            <p>New to ema-john? <Link to='/signup'>Create New Account</Link></p>
        </div>
    );
};

export default Login;