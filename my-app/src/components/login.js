import React from 'react'
import { Form, Field, Formik } from 'formik';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { registerUser } from '../utils/auth';

function Login({ isRegistered, setAuth }) {
    let navigate = useNavigate();

    const handleFormSubmit = async (values) => {
        const userData = {
            username: values.username,
            email: values.email,
            password: values.password,
        };
        if (!isRegistered) {
            try {
                const res = await registerUser(userData);
                setAuth(res.user);
                navigate("/");
            } catch (error) {
                toast.error("Something went wrong");
                console.log(error);
            }
        } else {
            axios.post("http://localhost:5001/user/login", userData)
                .then((res) => {
                    setAuth(res.data.user);
                    localStorage.setItem("auth", res.data.token);
                    navigate("/");
                })
                .catch((err) => {
                    toast.error("Something went wrong");
                    console.log(err)
                })
        }
    }
    return (
        <div>
            <header className="masthead" style={{
                backgroundImage: "url('https://images.unsplash.com/photo-1484100356142-db6ab6244067?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80')"
            }}>
                <div className="overlay"></div>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 col-md-10 mx-auto">
                            <div className="page-heading">
                                {isRegistered ?
                                    (
                                        <div>
                                            <h1>Log In</h1>
                                            <span className="subheading">Welcome Back!</span>
                                        </div>
                                    ) :
                                    (
                                        <h1>Register</h1>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <div className="container">
                <div className="row">
                    <div className="col-lg-8 col-md-10 mx-auto">
                        <Formik initialValues={{
                            Name: '',
                            Email: '',
                            Password: ''
                        }} onSubmit={handleFormSubmit}>
                            <Form>
                                {!isRegistered && (
                                    <>
                                        <label htmlFor="username">Name</label>
                                        <Field
                                            type="text"
                                            name="username"
                                            className="form-control"
                                        />
                                    </>
                                )}
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