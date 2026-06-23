import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const Login = () => {


    const [username, setUsername] = useState()
    const [password, setPassword] = useState()
    const [errMsg, setErrMsg] = useState()

    const loginApi = "http://localhost:8080/api/auth/login";
    const userDetailsApi = "http://localhost:8080/api/auth/user-details"

    const navigate = useNavigate()


    const onLogin = async (e) => {
        e.preventDefault();
        console.log("Login button clicked");

        const config = {
            headers: {
                'Authorization': "Basic " + window.btoa(username + ":" + password)
            }
        }
        try {
            const response = await axios.get(loginApi, config)
            console.log(response.data)
            let token = response.data.token
            // Save this in localStorage 
            localStorage.setItem("token", token)
            localStorage.setItem("username", username)

            // Prepare the header 
            const config_details = {
                headers: {
                    'Authorization': "Bearer " + token
                }
            }
            // Fetch User Details
            const resp = await axios.get(userDetailsApi, config_details)
            console.log(resp.data)
            let role = resp.data.role
            switch (role) {
                case 'SELLER':
                    navigate('/seller')
                    break;
                case 'ADMIN':
                    navigate('/admin')
                    break;
                case 'CUSTOMER':
                    navigate('/customer')
                    break;
                default:
                    setErrMsg("Invalid credentials")
                    break;
            }
        }
        catch (err) {
            setErrMsg("Invalid credentials")
        }
    }

    return (
        <>
            <Navbar />
            <div className="container">

                <div
                    className="row justify-content-center align-items-center"
                    style={{ minHeight: "85vh" }}
                >

                    <div className="col-md-5">

                        <div className="card border-0 shadow-lg rounded-4">

                            <div className="card-body p-5">

                                <h2 className="text-center fw-bold mb-2">
                                    Welcome Back 👋
                                </h2>

                                <p className="text-center text-muted mb-4">
                                    Login to sell or shop
                                </p>

                                <form onSubmit={(e) => onLogin(e)}>
                                    {
                                        errMsg !== undefined ?
                                            <div className="alert alert-primary">
                                                {errMsg}
                                            </div> :
                                            ""
                                    }
                                    <div className="mb-3">
                                        <label className="form-label">
                                            Username
                                        </label>

                                        <input
                                            type="text"
                                            className="form-control form-control-lg"
                                            placeholder="Enter username"
                                            onChange={(e) => setUsername(e.target.value)}
                                        />
                                    </div>

                                    <div className="mb-4">
                                        <label className="form-label">
                                            Password
                                        </label>

                                        <input
                                            type="password"
                                            className="form-control form-control-lg"
                                            placeholder="Enter password"
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                    </div>

                                    <button
                                        className="btn btn-dark w-100 py-2 rounded-pill"
                                    >
                                        Login
                                    </button>

                                </form>

                                <div className="text-center mt-4">

                                    <small className="text-muted">
                                        <div>
                                            Don't have an account?{" "}
                                            <Link
                                                to="/register/customer"
                                                className="text-decoration-none fw-semibold"
                                            >
                                                Register
                                            </Link>
                                        </div><p></p>
                                        <div></div>
                                        <div>
                                            Become a Seller{" "}
                                            <Link
                                                to="/register/seller"
                                                className="text-decoration-none fw-semibold"
                                            >
                                                Register
                                            </Link>
                                        </div>
                                    </small>


                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>
        </>
    );
};

export default Login