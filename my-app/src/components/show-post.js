import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import axiosInstance from '../axiosInstance';

const Showpost = () => {

  const [post, viewPost] = useState();
  const location = useParams();
  const getRequestedPost = (postId) => {
    axiosInstance.get(`post/${postId}`)
      .then((res) => {
        viewPost(res.data);
        console.log(res.data)
      })
      .catch((err) => { console.log(err) })
  };
  useEffect(() => {
    getRequestedPost(location.postId);
  }, [location.postId]);


  return post && (
    <div>
      <header className="masthead" style={{
        backgroundImage: `url(${post.imageLink})`
      }}>
        <div className="overlay"></div>
        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-md-10 mx-auto">
              <div className="post-heading">
                <h1>{post.title}</h1>
                <h2 className="subheading">{post?.subtitle}</h2>
                <span className="meta">Posted by &nbsp;
                  <a href="#">{post.user?.username}</a>
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <article>
        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-md-10 mx-auto">
              {post.postContent}
              <hr></hr>

              <div className="clearfix">
                <Link className="btn btn-primary float-right" to={`/edit-post/${post._id}`}>Edit Post</Link>
              </div>

            </div>
          </div>
        </div>
      </article>
    </div>
  )
}

export default Showpost