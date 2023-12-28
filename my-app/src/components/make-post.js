import React from 'react';
import { Formik, Form, Field } from 'formik';
import axios from "axios";
import { useNavigate, useParams } from 'react-router-dom';
function BlogPostForm({ isEdit }) {

  let navigate = useNavigate();
  let params = useParams();

  const handleFormSubmit = (values) => {
    const postData = {
      title: values.title,
      subtitle: values.subtitle,
      imageLink: values.imageLink,
      postContent: values.postContent,
    };
    if (!isEdit) {
      axios.post("http://localhost:5000/post", postData)
      .then((res) => {
        console.log(res.data)
        navigate("/");
      })
      .catch((err) => { console.log(err) })
    } else {
      let postId = params.postId;
      axios.patch(`http://localhost:5000/post/${postId}`, postData).then((res) => {
        
        console.log(res.data)
        navigate("/");
      })
        .catch((err) => { console.log(err) })
    }
  };

  return (
    <div>
      <header className="masthead">
        <div className="overlay"></div>
        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-md-10 mx-auto">
              <div className="page-heading">
                {isEdit ? (
                  <h1>Edit Post</h1>
                ) : (
                  <h1>Make Post</h1>
                )}
                {!isEdit && (
                  <span className="subheading">You're going to make a great blog post!</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container">
        <div className="row">
          <div className="col-lg-8 col-md-10 mx-auto">
            <Formik
              initialValues={{
                title: '',
                subtitle: '',
                imageLink: '',
                postContent: '',
              }}
              onSubmit={handleFormSubmit}
            >
              <Form>
                <div className="form-group">
                  <label htmlFor="title">Title</label>
                  <Field
                    type="text"
                    id="title"
                    name="title"
                    className="form-control"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="subtitle">Subtitle</label>
                  <Field
                    type="text"
                    id="subtitle"
                    name="subtitle"
                    className="form-control"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="imageLink">Image Link</label>
                  <Field
                    type="text"
                    id="imageLink"
                    name="imageLink"
                    className="form-control"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="postContent">Post Content</label>
                  <Field
                    as="textarea"
                    id="postContent"
                    name="postContent"
                    className="form-control"
                  />
                </div>

                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </Form>
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogPostForm;
