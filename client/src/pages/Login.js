import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useAuth from '../hooks/useAuth';

const Login = () => {
   const [username, setUsername] = useState(null);
   const [password, setPassword] = useState(null);
   const [error, setError] = useState(null);
   const [auth, authError, authLoading] = useAuth();

   console.log(auth);

   const handleLogin = (e) => {
      e.preventDefault();

      return axios.post('http://localhost:3001/login', { username, password })
         .then(res => {
            if (!res.data.auth) return;
            
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("user", JSON.stringify(res.data.user));
         }).catch(err => setError(err));
   }

   const userAuthenicated = (e) => {
      e.preventDefault();

      axios.get('http://localhost:3001/isAuth', {
         headers: {
            "x-access-token": localStorage.getItem("token")
         }
      }).then(res => console.log(res)).catch(err => setError(err));
   }

   return (
      <div className='container'>
         <form onSubmit={handleLogin}>
            <div>
               <label htmlFor="username">Username</label>
               <input type="text" id="username" onChange={({target}) => setUsername(target.value)} />
            </div>
            <div>
               <label htmlFor="password">Password</label>
               <input type="text" id="password" onChange={({target}) => setPassword(target.value)} />
            </div>
            <input type="submit" value="Login"/>
         </form>
         <button onClick={userAuthenicated}>Check authenication</button>
      </div>
   )
}

export default Login;