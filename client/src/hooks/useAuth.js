import React, { useState, useEffect } from 'react';
import axios from 'axios';

const useAuth = (setLoading, setError) => {
   const [auth, setAuth] = useState(null);
   const [authLoading, setAuthLoading] = useState(false);
   const [authError, setAuthError] = useState(null);

   useEffect(() => {
      setAuthLoading(true);

      const checkAuth = async () => {

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
            setAuthError(err);
         } finally {
            setAuthLoading(false);
         }
      }

      checkAuth();
   }, []);
   

   return [auth, authLoading, authError];
}

export default useAuth;