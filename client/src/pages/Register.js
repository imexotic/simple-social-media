import React, { useState, useEffect } from 'react';
import { registerSchema } from '../models/yup.models';
import axiosInstance from '../config/axios';

const Register = () => {
   const [username, setUsername] = useState();
   const [password, setPassword] = useState();
   const [email, setEmail] = useState();
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState(null);

   const handleRegister = (e) => {
      e.preventDefault();

      const registerData = {
         username, password, email
      }

      setLoading(true);
      return registerSchema.isValid(registerData).then(valid => {
         if (!valid) return;

         axiosInstance.post('/register', registerData)
            .then(res => res).catch(err => setError(err))

      }).catch(err => setError(err)).finally(setLoading(false));
   }

   if (error) return <div>Error occured: {error}</div>;
   if (loading) return <div>Loading spinner</div>;
   
   return (
      <div className="container">
         <form onSubmit={handleRegister}>
            <div>
               <label htmlFor="username">Username</label>
               <input type="text" id="username" onChange={({target}) => setUsername(target.value)} />
            </div>
            <div>
               <label htmlFor="email">Email</label>
               <input type="text" id="email" onChange={({target}) => setEmail(target.value)} />
            </div>
            <div>
               <label htmlFor="password">Password</label>
               <input type="text" id="password" onChange={({target}) => setPassword(target.value)} />
            </div>
            <input type="submit" value="Register"/>
         </form> 
      </div>
   )
}

export default Register;