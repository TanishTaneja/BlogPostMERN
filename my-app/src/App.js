import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar';
import Footer from './components/footer';
import Main from './components/main';
import BlogPostForm from './components/make-post';
import Showpost from './components/show-post';
import Login from './components/login';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <BrowserRouter>
      <Navbar isLoggedIn={false} />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/post" element={<BlogPostForm isEdit={false} />} />
        <Route path="/post/:postId" element={<Showpost />} />
        <Route path="/edit-post/:postId" element={<BlogPostForm isEdit={true} />} />
        <Route path="/login" element={<Login isRegistered={true} />} />
        <Route path="/register" element={<Login isRegistered={false} />} />
      </Routes >
      <Footer />
      <Toaster/>
    </BrowserRouter>
  );
}

export default App;