import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Create from './pages/Create';
import Post from './pages/Post';
import Edit from './pages/Edit';

import useAuth from './hooks/useAuth';

const App = () => {
  const [auth, authLoading, authError] = useAuth();

  console.log(auth);

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={ auth ? <Home /> : <Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/create" element={<Create />} />
          <Route exact path="/post/:id" element={<Post />}/>
          <Route exact path="/edit/:id" element={<Edit />}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
