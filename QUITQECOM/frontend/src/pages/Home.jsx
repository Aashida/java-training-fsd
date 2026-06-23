import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";

const Home = () => {

    return (

        <div
            style={{
                backgroundColor: "#f8f9fa",
                minHeight: "100vh"
            }}
        >

            <Navbar />

            <div className="container py-5">

                <div className="row align-items-center">

                    <div className="col-md-6">

                        <h1
                            className="display-4 fw-bold"
                        >
                            Shop Smarter with
                            <span className="text-dark">
                                {" "}QuitQ
                            </span>
                        </h1>

                        <p
                            className="lead mt-3"
                        >
                            Discover amazing products,
                            explore categories,
                            and enjoy a seamless
                            shopping experience.
                        </p>

                        <div className="mt-4">

                            <Link
                                to="/products"
                            >
                                <button
                                    className="btn btn-dark btn-lg me-3"
                                >
                                    Shop Now
                                </button>
                            </Link>

                            <Link
                                to="/login"
                            >
                                <button
                                    className="btn btn-outline-dark btn-lg"
                                >
                                    Login
                                </button>
                            </Link>

                        </div>

                    </div>

                    <div className="col-md-6 text-center">

                        <img
                            src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da"
                            alt="Shopping"
                            className="img-fluid rounded shadow"
                        />

                    </div>

                </div>

                <div className="row mt-5 text-center">

                    <div className="col-md-4">

                        <div
                            className="card shadow-sm border-0 p-4"
                        >

                            <h4>
                                🛍️ Wide Selection
                            </h4>

                            <p>
                                Browse products across
                                multiple categories.
                            </p>

                        </div>

                    </div>

                    <div className="col-md-4">

                        <div
                            className="card shadow-sm border-0 p-4"
                        >

                            <h4>
                                🚚 Fast Delivery
                            </h4>

                            <p>
                                Get products delivered
                                quickly and securely.
                            </p>

                        </div>

                    </div>

                    <div className="col-md-4">

                        <div
                            className="card shadow-sm border-0 p-4"
                        >

                            <h4>
                                ⭐ Trusted Quality
                            </h4>

                            <p>
                                Shop from verified
                                sellers with confidence.
                            </p>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

};

export default Home;