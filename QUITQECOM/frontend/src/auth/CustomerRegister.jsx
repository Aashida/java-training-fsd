import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Navbar from "../components/Navbar";

const CustomerRegister = () => {

    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [address, setAddress] = useState("");
    const [msg, setMsg] = useState("");

    const navigate = useNavigate();

    const registerApi =
        "http://localhost:8080/api/register/customer";

    const onRegister = async (e) => {
        e.preventDefault();

        const data = {
            email,
            username,
            password,
            firstName,
            lastName,
            phoneNumber,
            address
        };

        try {
            await axios.post(registerApi, data);

            toast.success("Registration Successful");
            navigate("/login");

        } catch (err) {
            console.log(err);
            setMsg("Registration Failed");
        }
    };

    return (
        <>
            <Navbar />

            <div className="container">

                <div
                    className="row justify-content-center align-items-center"
                    style={{ minHeight: "85vh" }}
                >

                    <div className="col-md-6">

                        <div className="card border-0 shadow-lg rounded-4">

                            <div className="card-body p-5">

                                <h2 className="text-center fw-bold mb-2">
                                    Create Customer Account 🛍️
                                </h2>

                                <p className="text-center text-muted mb-4">
                                    Start shopping with QuitQ
                                </p>

                                <form onSubmit={onRegister}>

                                    {msg && (
                                        <div className="alert alert-danger">
                                            {msg}
                                        </div>
                                    )}

                                    <div className="mb-3">
                                        <label className="form-label">
                                            First Name
                                        </label>

                                        <input
                                            type="text"
                                            className="form-control form-control-lg"
                                            placeholder="Enter first name"
                                            value={firstName}
                                            onChange={(e) =>
                                                setFirstName(e.target.value)
                                            }
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label">
                                            Last Name
                                        </label>

                                        <input
                                            type="text"
                                            className="form-control form-control-lg"
                                            placeholder="Enter last name"
                                            value={lastName}
                                            onChange={(e) =>
                                                setLastName(e.target.value)
                                            }
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label">
                                            Email
                                        </label>

                                        <input
                                            type="email"
                                            className="form-control form-control-lg"
                                            placeholder="Enter email"
                                            value={email}
                                            onChange={(e) =>
                                                setEmail(e.target.value)
                                            }
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label">
                                            Username
                                        </label>

                                        <input
                                            type="text"
                                            className="form-control form-control-lg"
                                            placeholder="Enter username"
                                            value={username}
                                            onChange={(e) =>
                                                setUsername(e.target.value)
                                            }
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label">
                                            Password
                                        </label>

                                        <input
                                            type="password"
                                            className="form-control form-control-lg"
                                            placeholder="Enter password"
                                            value={password}
                                            onChange={(e) =>
                                                setPassword(e.target.value)
                                            }
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label">
                                            Phone Number
                                        </label>

                                        <input
                                            type="text"
                                            className="form-control form-control-lg"
                                            placeholder="Enter phone number"
                                            value={phoneNumber}
                                            onChange={(e) =>
                                                setPhoneNumber(e.target.value)
                                            }
                                        />
                                    </div>

                                    <div className="mb-4">
                                        <label className="form-label">
                                            Address
                                        </label>

                                        <textarea
                                            className="form-control form-control-lg"
                                            rows="3"
                                            placeholder="Enter address"
                                            value={address}
                                            onChange={(e) =>
                                                setAddress(e.target.value)
                                            }
                                        />
                                    </div>

                                    <button
                                        className="btn btn-dark w-100 py-2 rounded-pill"
                                    >
                                        Register
                                    </button>

                                </form>

                                <div className="text-center mt-4">

                                    <small className="text-muted">
                                        Already have an account?{" "}
                                        <Link
                                            to="/login"
                                            className="text-decoration-none fw-semibold"
                                        >
                                            Login
                                        </Link>
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

export default CustomerRegister;