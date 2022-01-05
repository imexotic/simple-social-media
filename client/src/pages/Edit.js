import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';

const Edit = () => {
   const { id } = useParams();
   const location = useLocation();
   const { 
      title: postTitle, 
      description: postDescription 
   } = location.state;
 
   const [title, setTitle] = useState(postTitle);
   const [description, setDescription] = useState(postDescription);

   const handleUpdate = (e) => {
      e.preventDefault();
   }

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