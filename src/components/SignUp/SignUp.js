
import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/UserContext';
import './SignUp.css'

const SignUp = () => {

    const [error, setError] = useState(null);
    const {createUser} = useContext(AuthContext);

    const handleSubmit = (event) =>{
        event.preventDefault();
        let form = event.target;
        let email = form.email.value;
        let password = form.password.value;
        let confirm = form.confirm.value;

        console.log(email,password,confirm)

        if(password.length < 6){
            setError('Password should be at least 6 characters long')
            return;
        }

        if(password !== confirm){
            setError('Your password did not match');
            return;
        }

        createUser(email, password)
        .then( (result) =>{
            const user = result.user;
            form.reset();
            console.log(user);
        })
        .catch(error => console.error(error));
        
    }

    return (
        <div className='form-container'>
            <h2 className='form-title'>Sign Up</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-control">
                    <label htmlFor="email">Email</label>
                    <input type="email" name='email' placeholder='Enter email' required />
                </div>
                <div className="form-control">
                    <label htmlFor="password">Password</label>
                    <input type="password" name='password' placeholder='Enter password' required />
                </div>
                <div className="form-control">
                    <label htmlFor="confirm">Confirm Password</label>
                    <input type="password" name='confirm' placeholder='Enter password' required />
                </div>
                <input className='btn-submit' type="submit" value="Sign Up" />
                <p>Already have an account? <Link to='/login'>Login</Link></p>
                <p className='text-error'>{error ? error : ''}</p>
            </form>
        </div>
    );
};

export default SignUp;