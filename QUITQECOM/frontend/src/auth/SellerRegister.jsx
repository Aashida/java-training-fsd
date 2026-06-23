import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Navbar from "../components/Navbar";

const SellerRegister = () => {

    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [shopName, setShopName] = useState("");
    const [businessAddress, setBusinessAddress] = useState("");
    const [gstNumber, setGstNumber] = useState("");
    const [msg, setMsg] = useState("");

    const navigate = useNavigate();

    const registerApi =
        "http://localhost:8080/api/register/seller";

    const onRegister = async (e) => {
        e.preventDefault();

        const data = {
            email,
            username,
            password,
            shopName,
            businessAddress,
            gstNumber
        };

        try {
            const response = await axios.post(registerApi, data);

            toast.success(response.data.message);
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
                                    Become a Seller 🏪
                                </h2>

                                <p className="text-center text-muted mb-4">
                                    Start selling on QuitQ
                                </p>

                                <form onSubmit={onRegister}>

                                    {msg &&
                                        <div className="alert alert-danger">
                                            {msg}
                                        </div>
                                    }

                                    <div className="mb-3">
                                        <label className="form-label">
                                            Shop Name
                                        </label>

                                        <input
                                            type="text"
                                            className="form-control form-control-lg"
                                            onChange={(e) =>
                                                setShopName(e.target.value)
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
                                            onChange={(e) =>
                                                setPassword(e.target.value)
                                            }
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label">
                                            Business Address
                                        </label>

                                        <input
                                            type="text"
                                            className="form-control form-control-lg"
                                            onChange={(e) =>
                                                setBusinessAddress(e.target.value)
                                            }
                                        />
                                    </div>

                                    <div className="mb-4">
                                        <label className="form-label">
                                            GST Number
                                        </label>

                                        <input
                                            type="text"
                                            className="form-control form-control-lg"
                                            onChange={(e) =>
                                                setGstNumber(e.target.value)
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

export default SellerRegister;