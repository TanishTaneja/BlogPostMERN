import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Main = () => {
  const [allPosts, setAllPosts] = useState([]);
  
  const getPostsFromDb = () => {
    axios.get("http://localhost:5000/post")
      .then((res) => {
        setAllPosts(res.data)
      })
      .catch((err) => {console.log(err)})
  };
  useEffect(() => {
    getPostsFromDb();
  }, []);         
  const deletePost=(postId)=>{
    axios.delete(`http://localhost:5000/post/${postId}`)
    .then((res)=>{
      setAllPosts((prev) => prev.filter((item) => item._id !== postId));
    })
    .catch((err)=>console.log(err));
  }

  return (
    <div>
      <header className="masthead" >
        <div className="overlay"></div>
        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-md-10 mx-auto">
              <div className="site-heading">
                <h1>Tvs Blog</h1>
              </div>
            </div>
          </div>
        </div>
      </header>
      <div className="container">
        <div className="row">
          <div className="col-lg-8 col-md-10 mx-auto">
            {allPosts.map((post) => (
              <div className="post-preview" key={post.id}>
                <Link to={`post/${post._id}`}>
                  <h2 className="post-title">{post.title}</h2>
                  <h3 className="post-subtitle">{post.subtitle}</h3>
                </Link>
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
