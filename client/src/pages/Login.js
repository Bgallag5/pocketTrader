import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { LOGIN_USER } from '../utils/mutations';
import Auth from '../utils/auth';


export default function Login() {

    const [formState, setFormState] = useState({email: "", password: ""});
    const [loginUser, { error }] = useMutation(LOGIN_USER);

    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormState({...formState, [name]: value})
    }

    const handleFormSubmit = async (event) => {
        event.preventDefault();
    
        // check if form has everything (as per react-bootstrap docs)
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }
    
        try {
          const { data } = await loginUser({
            variables: {
              ...formState
            }
          });
    
          if (error) {
            throw new Error('something went wrong!');
          }
    
        //   const { token, user } = await response.json();
        //   console.log(user);
          Auth.login(data.login.token);
        } catch (err) {
          console.error(err);
        //   setShowAlert(true);
        }
    
        setFormState({
          email: '',
          password: '',
        });
      };


    return (
        <div className='container'>
            <form>
            <input
             name='email'
             value={formState.email} 
             type='text'
             placeholder='email..'
             onChange={handleChange}
            >
            </input>
            <input
            name='password'
            value={formState.password}
            type='text'
            placeholder='password..'
            onChange={handleChange}
            >
            </input>
            </form>
        </div>
    )
}
