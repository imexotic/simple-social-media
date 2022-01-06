import React, { useState, useEffect } from 'react';
import moment from 'moment';

import axiosInstance from '../config/axios';
import useAuth from '../hooks/useAuth';

const Create = () => {
   const [title, setTitle] = useState();
   const [description, setDescription] = useState();
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState(null);
   const [auth, authLoading, authError] = useAuth();


   const handleCreate = (e) => {
      e.preventDefault();

      const postData = {
         user_id: auth.id,
         title: title,
         description, description,
         createdAt: moment().format('YYYY-MM-DD')
      }

      setLoading(true);

      return axiosInstance.post('/posts', postData)
         .then(res => res)
         .catch(err => setError(err))
         .finally(setLoading(false));
   }


   return (
      <div className="container">
         <form onSubmit={handleCreate}>
         <div>
               <label htmlFor='title'>Title</label>
               <input type="text"  onChange={({target}) => setTitle(target.value)}/>
            </div>
            <div>
               <label htmlFor='description'>Description</label>
               <input type="text" onChange={({target}) => setDescription(target.value)}/>
            </div>
            <input type="submit" value="Create Post"/>
         </form>
      </div>
   )
}

export default Create;