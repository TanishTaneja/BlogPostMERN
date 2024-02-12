import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar';
import Footer from './components/footer';
import Main from './components/main';
import BlogPostForm from './components/make-post';
import Showpost from './components/show-post';
import Login from './components/login';
import VerifyEmail from './components/verifyEmail';
import { Toaster } from 'react-hot-toast';


function App() {
  const [auth, setAuth] = useState(false);
  useEffect(() => {
    var auth = localStorage.getItem("auth");
    if (auth) setAuth(true);
    else {
      setAuth(false);
    }
  }, []);
  return (
    <BrowserRouter>
      <Navbar isLoggedIn={auth} setAuth={setAuth} />
      <Routes>
        <Route path="/" element={<Main auth={auth} />} />
        <Route path="/post" element={<BlogPostForm isEdit={false} />} />
        <Route path="/post/:postId" element={<Showpost />} />
        <Route path="/edit-post/:postId" element={<BlogPostForm isEdit={true} />} />
        <Route path="/login" element={<Login isRegistered={true} setAuth={setAuth} />} />
        <Route path="/register" element={<Login isRegistered={false} setAuth={setAuth} />} />
        {/* route for vefifying email */}
        <Route path="/verify/:token" element={<VerifyEmail />} />
      </Routes >
      <Footer />
      <Toaster />
    </BrowserRouter>
  );
}

export default App;