import React, { useState, useEffect } from 'react';

import axiosInstance from '../config/axios';


const useAuth = (setLoading, setError) => {
   const [auth, setAuth] = useState(false);
   const [authLoading, setAuthLoading] = useState(false);
   const [authError, setAuthError] = useState(null);

   useEffect(() => {
      const checkAuth = async () => {
         setAuthLoading(true);

         try {
            const response = await axiosInstance.get('/isAuth');
            const data = await response.data;

            if (data.auth) {
               const userData = JSON.parse(localStorage.getItem('userData'));
               return setAuth(userData.user);
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