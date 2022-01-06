import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import axiosInstance from '../config/axios';

const Edit = () => {
   const { id } = useParams();
   const location = useLocation();
   const navigate = useNavigate();

   const { 
      title: postTitle, 
      description: postDescription 
   } = location.state;

   const [title, setTitle] = useState(postTitle);
   const [description, setDescription] = useState(postDescription);
   const [error, setError] = useState(null);

   const handleUpdate = (e) => {
      e.preventDefault();

      const editedData = {
         title, description
      }

      return axiosInstance.put(`/posts/${id}`, editedData)
         .then(res => navigate(`/post/${id}`))
         .catch(err => setError(err))
   }

   if (error) return <div>Error: {error}</div>

   return (
      <div className='container'>
         <form onSubmit={handleUpdate}>
            <div>
               <label htmlFor='title'>Title</label>
               <input type="text" value={title} onChange={({target}) => setTitle(target.value)}/>
            </div>
            <div>
               <label htmlFor='description'>Description</label>
               <input type="text" value={description} onChange={({target}) => setDescription(target.value)}/>
            </div>
            <input type="submit" value="Update post"></input>
         </form>
      </div>
   )
}

export default Edit;