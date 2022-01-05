import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

import '../styles/Home.css';

const Home = () => {
   const [posts, setPosts] = useState([]);
   const [error, setError] = useState(null);
   const navigate = useNavigate();

   useEffect(() => {
      axios.get('http://localhost:3001/posts', {
         headers: { 'x-access-token': localStorage.getItem('token') }
      }).then(res => setPosts(res.data)).catch(err => setError(err));
   }, []);

   console.log(posts);

   const handlePostClick = (id) => {
      return navigate(`/post/${id}`);
   }

   if (error) return <div>Error while fetching posts</div>;

   return (
      <div className="container">
         {posts.map((post, key) => {
            return (
               <div className="post-card" key={key} onClick={() => handlePostClick(post.id)}>
                  <h2>{post.title}</h2>
                  <p>{post.description}</p>
                  <p>{post.createdAt}</p>
               </div>
            );
         })}
      </div>
   );
}

export default Home;