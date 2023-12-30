import React from 'react'
import { Form, Field, Formik } from 'formik';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login ({ isRegistered }) {
    let navigate=useNavigate();
    const handleFormSubmit = (values) => {
        const userData = {
            username: values.username,
            email:values.email,
            password: values.password,
        };
        if(!isRegistered){
            axios.post("http://localhost:5000/post/register",userData)
            .then((res)=>{
                navigate("/");
            })
            .catch((err)=>{
                console.log(err)
            })
        }
        else{
            axios.post("http://localhost:5000/post/login",userData)
            .then((res)=>{
                console.log("logged in successfully")
                navigate("/");
            })
            .catch((err)=>{
                console.log(err)
            })
        }
    }   
    return (
    <div>
        <header class="masthead" style={{
            backgroundImage:"url('https://images.unsplash.com/photo-1484100356142-db6ab6244067?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80')"
        }}>
            <div class="overlay"></div>
            <div class="container">
            <div class="row">
                <div class="col-lg-8 col-md-10 mx-auto">
                <div class="page-heading">
                    {isRegistered ?
                        (
                        <div>
                        <h1>Log In</h1>
                        <span class="subheading">Welcome Back!</span>
                        </div>
                        ):
                        (
                            <h1>Register</h1>
                        )
                    }
                </div>
                </div>
            </div>
            </div>
         </header>
         <div class="container">
            <div class="row">
                <div class="col-lg-8 col-md-10 mx-auto">
                <Formik initialValues={{
                    Name: '',
                    Email:'',
                    Password: ''
                }} onSubmit={handleFormSubmit}>
                    <Form>
                    <label htmlFor="username">Name</label>
                    <Field
                        type="text"
                        name="username"
                        className="form-control"
                    />
                    <label htmlFor="email">Email</label>
                    <Field
                        type="text"
                        name="email"
                        className="form-control"
                    />
                    <label htmlFor="password">Password</label>
                    <Field
                        type="password"
                        name="password"
                        className="form-control"
                    />
                    <button type="submit" className="btn btn-primary">
                        Submit
                    </button>
                    </Form>
                </Formik>
                </div>
            </div>
        </div>
    </div>
  )
}
export default Login;