import React from 'react'

// if(!registerd){
//     render register page
// }
// else{
//     login page
// }
// if(sessionId){
//     home page
//     and on nav bar page show logout button
// }
const Login = ({ isRegistered }) => {
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
    </div>
  )
}
export default Login;