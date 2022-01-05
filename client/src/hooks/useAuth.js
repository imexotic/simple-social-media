import React, { useState, useEffect } from 'react';
import axios from 'axios';

const useAuth = (setLoading, setError) => {
   const [auth, setAuth] = useState(null);

   useEffect(() => {
      const checkAuth = async () => {
         setLoading(true);
         try {
            const response = await axios.get('http://localhost:3001/isAuth', {
               headers: { "x-access-token": localStorage.getItem("token") }
            });
            const data = await response.data;
      
            if (data.auth) {
               const user = JSON.parse(localStorage.getItem('user'));
               
               return setAuth(user);
            };
   
            return data.auth;
         } catch(err) {
            setError(err);
         } finally {
            setLoading(false);
         }
      }

      checkAuth();
   }, []);

   return auth;
}

export default useAuth;