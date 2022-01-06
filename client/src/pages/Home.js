import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import moment from 'moment';

import axiosInstance from '../config/axios';

import '../styles/Home.css';


const Home = () => {
   const [posts, setPosts] = useState([]);
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState(null);
   const navigate = useNavigate();

   useEffect(() => {
      setLoading(true);
      
      return axiosInstance.get('/posts')
         .then(res => setPosts(res.data))
         .catch(err => setError(err))
         .finally(setLoading(false));
   }, []);

   const handlePostClick = (id) => {
      return navigate(`/post/${id}`);
   }

   if (loading) return <div>Loading spinner...</div>
   if (error) return <div>Error while fetching posts</div>;

   return (
      <div className="container">
         {posts.map((post, idx) => {
            return (
               <div className="post-card" key={idx} onClick={() => handlePostClick(post.id)}>
                  <h2>{post.title}</h2>
                  <p>{post.description}</p>
                  <p>{moment(post.createdAt).format('ll')}</p>
               </div>
            );
         })}
      </div>
   );
}

export default Home;