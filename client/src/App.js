import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Post from './pages/Post';
import Edit from './pages/Edit';

const App = () => {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/post/:id" element={<Post />}/>
          <Route exact path="/edit/:id" element={<Edit />}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
