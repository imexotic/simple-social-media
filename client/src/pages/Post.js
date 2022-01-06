import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import moment from 'moment';

import axiosInstance from '../config/axios';
import useAuth from '../hooks/useAuth';


const Post = () => {
   const navigate = useNavigate();
   const { id } = useParams();
   const [post, setPost] = useState({});
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState(null);
   const [auth, authLoading, authError]  = useAuth();

   useEffect(() => {
      return axiosInstance.get(`/posts/${id}`)
         .then(res => setPost(res.data[0]))
         .catch(err => setError(err))
         .finally(() => setLoading(false));
   }, [id]);


   const handleEditClick = () => {
      return navigate(`/edit/${id}`, {
         state: post
      });
   }

   const handleDeleteClick = () => {
      return axiosInstance.delete(`/posts/${id}`)
         .then(res => res)
         .catch(err => setError(err));
   }

   if (error || authError) return <div>Error while fetching post.</div>
   if (loading || authLoading) return <div></div>;
   

   return (
      <div className="container">
         { auth?.id == post?.user_id && (
            <div>
                <button onClick={handleEditClick}>Edit</button>
               <button onClick={handleDeleteClick}>Remove</button>
            </div>
         ) }
         <p>{post.username}</p>
         <p>{moment(post.createdAt).format('ll')}</p>
         <h1>{post.title}</h1>
         <p>{post.description}</p>
      </div>
   )
}

export default Post;