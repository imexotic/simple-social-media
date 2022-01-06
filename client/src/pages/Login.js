import React, { useState, useEffect } from 'react';

import axiosInstance from '../config/axios';


const Login = () => {
   const [username, setUsername] = useState();
   const [password, setPassword] = useState();
   const [error, setError] = useState(null);


   const handleLogin = (e) => {
      e.preventDefault();

      const loginData = {
         username, password
      }

      return axiosInstance.post('/login', loginData)
         .then(res => {
            if (!res.data.auth) return;

            const { token, user } = res.data;

            const userData = {
               token: token,
               user: user
            }

            return localStorage.setItem("userData", JSON.stringify(userData));
         }).catch(err => setError(err));
   }

   const userAuthenicated = (e) => {
      e.preventDefault();

      return axiosInstance.get('/isAuth')
         .then(res => console.log(res)).catch(err => setError(err));
   }

   if (error) return <div>Error occured</div>;

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