import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from '../axiosInstance';

const Main = () => {
  const [allPosts, setAllPosts] = useState([]);

  const getPostsFromDb = () => {
    axiosInstance.get("/post")
      .then((res) => {
        setAllPosts(res.data)
      })
      .catch((err) => { console.log(err) })
  };

  useEffect(() => {
    getPostsFromDb();
  }, []);
  const deletePost = (postId) => {
    axiosInstance.delete(`/post/${postId}`)
      .then((res) => {
        setAllPosts((prev) => prev.filter((item) => item._id !== postId));
      })
      .catch((err) => console.log(err));
  }

  return (
    <div>
      <header className="masthead" >
        <div className="overlay"></div>
        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-md-10 mx-auto">
              <div className="site-heading">
                <h1>Taj Blog</h1>
              </div>
            </div>
          </div>
        </div>
      </header>
      <div className="container">
        <div className="row">
          <div className="col-lg-8 col-md-10 mx-auto">
            {allPosts.map((post) => (
              <div className="post-preview" key={post._id}>
                <Link to={`post/${post._id}`}>
                  <h2 className="post-title">{post.title}</h2>
                  <h3 className="post-subtitle">{post.subtitle}</h3>
                </Link>
                <p class="post-meta">Posted by &nbsp;
                  <a href="#">{post.user.username}</a>
                </p>
                <p className='delete-btn' onClick={() => {
                  deletePost(post._id);
                }}>✘</p>
              </div>
            ))}
            <hr />
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-lg-8 col-md-10 mx-auto">
            <div className="clearfix">
              <Link to="post" className="btn btn-primary float-right">Create New Post</Link>
            </div>
          </div>
        </div>
      </div>
      <hr />
    </div>
  );
};

export default Main;
