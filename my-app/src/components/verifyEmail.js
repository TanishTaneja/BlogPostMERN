import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const VerifyEmail = () => {
    const { token } = useParams();
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios
            .get(`http://localhost:5001/user/verify/${token}`)
            .then((res) => {
                setMessage(res.data.message);
                setLoading(false);
            })
            .catch((err) => {
                setMessage(err.response.data.message);
                setLoading(false);
            });
    }, [token]);

    return (
        <div>
            {loading ? (
                <h1>Loading...</h1>
            ) : (
                <div>
                    <h1>{message}</h1>
                    <Link to='/login'>Login</Link>
                </div>
            )}
        </div>
    );
}
export default VerifyEmail;