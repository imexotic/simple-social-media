import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import useAuth from '../hooks/useAuth';


const Post = () => {
   const { id } = useParams();
   const [post, setPost] = useState({});
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState(null);
   const auth = useAuth(setLoading, setError);



   useEffect(() => {
      setLoading(true);
      axios.get(`http://localhost:3001/posts/${id}`)
         .then(res => setPost(res.data[0]))
         .catch(err => setError(err))
         .finally(() => setLoading(false));
   }, []);


   if (error) return <div>Error while fetching post.</div>
   if (loading) return <div></div>;
   
   console.log(auth);

   return (
      <div className="container">
         <p>{post.username}</p>
         <h1>{post.title}</h1>
         <p>{post.description}</p>
         <p>{post.createdAt}</p>
      </div>
   )
}

export default Post;