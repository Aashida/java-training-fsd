import CustomerNavbar from "../../components/Navbar-Customer";

import {
    useNavigate
} from "react-router-dom";

const CustomerDashboard = () => {

    const username =
        localStorage.getItem(
            "username"
        );

    const navigate =
        useNavigate();

    return (

        <div
            style={{
                backgroundColor: "#f8f9fa",
                minHeight: "100vh"
            }}
        >

            <CustomerNavbar />

            <div className="container py-5">

                <div
                    className="bg-dark text-white rounded-4 shadow p-5 mb-5"
                >

                    <h1
                        className="fw-bold display-5"
                    >
                        Welcome Back,
                        {" "}
                        {username}
                        👋
                    </h1>

                    <p
                        className="fs-5 mb-0"
                    >
                        Explore products, manage your cart,
                        track orders and enjoy shopping with QuitQ.
                    </p>

                </div>

                <div className="row g-4">

                    <div className="col-md-4">

                        <div
                            className="card border-0 shadow h-100"
                            style={{
                                cursor: "pointer",
                                transition: "0.3s"
                            }}
                            onClick={() => {

                                // PRODUCTS ROUTE HERE

                                navigate("/customer/products")

                            }}
                        >

                            <div className="card-body text-center p-5">

                                <h1>
                                    🛍️
                                </h1>

                                <h4
                                    className="fw-bold mt-3"
                                >
                                    Products
                                </h4>

                                <p
                                    className="text-muted"
                                >
                                    Browse all available products
                                    and discover new arrivals.
                                </p>

                            </div>

                        </div>

                    </div>

                    <div className="col-md-4">

                        <div
                            className="card border-0 shadow h-100"
                            style={{
                                cursor: "pointer",
                                transition: "0.3s"
                            }}
                            onClick={() => {

                                // ORDERS ROUTE HERE

                                navigate("/customer/orders")

                            }}
                        >

                            <div className="card-body text-center p-5">

                                <h1>
                                    📦
                                </h1>

                                <h4
                                    className="fw-bold mt-3"
                                >
                                    Orders
                                </h4>

                                <p
                                    className="text-muted"
                                >
                                    View your order history
                                    and track deliveries.
                                </p>

                            </div>

                        </div>

                    </div>

                    <div className="col-md-4">

                        <div
                            className="card border-0 shadow h-100"
                            style={{
                                cursor: "pointer",
                                transition: "0.3s"
                            }}
                            onClick={() => {

                                // CART ROUTE HERE

                                navigate("/customer/cart")

                            }}
                        >

                            <div className="card-body text-center p-5">

                                <h1>
                                    🛒
                                </h1>

                                <h4
                                    className="fw-bold mt-3"
                                >
                                    Cart
                                </h4>

                                <p
                                    className="text-muted"
                                >
                                    Manage cart items and
                                    proceed to checkout.
                                </p>

                            </div>

                        </div>

                    </div>

                </div>

                <div
                    className="bg-white rounded-4 shadow p-4 mt-5"
                >

                    <h3
                        className="fw-bold"
                    >
                        Why Shop With QuitQ?
                    </h3>

                    <div className="row mt-3">

                        <div className="col-md-4">

                            <h5>
                                🚚 Fast Delivery
                            </h5>

                            <p>
                                Get products delivered
                                quickly and safely.
                            </p>

                        </div>

                        <div className="col-md-4">

                            <h5>
                                ⭐ Quality Products
                            </h5>

                            <p>
                                Shop from trusted
                                sellers with confidence.
                            </p>

                        </div>

                        <div className="col-md-4">

                            <h5>
                                💳 Secure Payments
                            </h5>

                            <p>
                                Safe and reliable
                                transaction experience.
                            </p>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

};

export default CustomerDashboard;