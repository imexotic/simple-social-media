import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import useAuth from '../hooks/useAuth';


const Post = () => {
   const { id } = useParams();
   const [post, setPost] = useState({});
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState(null);
   const [auth, authLoading, authError] = useAuth();
   const navigate = useNavigate();

   useEffect(() => {
      setLoading(true);

      return axios.get(`http://localhost:3001/posts/${id}`)
         .then(res => setPost(res.data[0]))
         .catch(err => setError(err))
         .finally(() => setLoading(false));
   }, []);


   const handleEditClick = () => {
      return navigate(`/edit/${id}`, {
         state: post
      });
   }

   if (error || authError) return <div>Error while fetching post.</div>
   if (loading || authLoading) return <div></div>;
   
   return (
      <div className="container">
         { auth?.id == post?.id && (
            <button onClick={handleEditClick}>Edit</button>
         ) }
         <p>{post.username}</p>
         <h1>{post.title}</h1>
         <p>{post.description}</p>
         <p>{post.createdAt}</p>
      </div>
   )
}

export default Post;