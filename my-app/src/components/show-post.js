import axios from 'axios'
import React,{ useEffect, useState }  from 'react'
import { Link, useParams } from 'react-router-dom';

const Showpost = () => {

  const [post, viewPost] = useState();
  const location=useParams();
  const getRequestedPost = (postId) => {
    axios.get(`http://localhost:5000/post/${postId}`)
      .then((res) => {
        viewPost(res.data)
      })
      .catch((err) => {console.log(err)})
  };
  useEffect(() => {
    getRequestedPost(location.postId);
  },[location.postId]);


  return post && (
    <div>
    <header className="masthead" style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1470092306007-055b6797ca72?ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80')"
      }}>
    <div class="overlay"></div>
      <div class="container">
      <div class="row">
        <div class="col-lg-8 col-md-10 mx-auto">
          <div class="post-heading">
            <h1>{post.title}</h1>
            <h2 class="subheading">{post.subtitle}</h2>
            {/* <span class="meta">Posted by
              <a href="#">{post.author.name}</a>
              on {post.date}</span> */}
          </div>
        </div>
      </div>
    </div>
  </header>

  <article>
    <div class="container">
      <div class="row">
        <div class="col-lg-8 col-md-10 mx-auto">
            { post.postContent }
          <hr></hr>
      
            <div class="clearfix">
            <Link class="btn btn-primary float-right" to={`/edit-post/${post._id}`}>Edit Post</Link>
            </div>
            
        </div>
       </div>
     </div>
   </article>
    </div>
  )
}

export default Showpost