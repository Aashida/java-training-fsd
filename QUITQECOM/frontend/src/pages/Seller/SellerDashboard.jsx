import SellerNavbar from "../../components/Navbar-Seller";
import SellerStatsCards from "../../components/seller/SellerStatsCards";

import {
    useNavigate
} from "react-router-dom";

const SellerDashboard = () => {

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

            <SellerNavbar />

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
                        Manage products, track orders,
                        and grow your business with QuitQ.
                    </p>

                </div>

                <div className="row g-4 mb-5">

                    <div className="col-md-4">

                        <div
                            className="card border-0 shadow h-100"
                            style={{
                                cursor: "pointer"
                            }}
                            onClick={() => {

                            

                                navigate(
                                    "/seller/add-product"
                                );

                            }}
                        >

                            <div className="card-body text-center p-4">

                                <h1>
                                    ➕
                                </h1>

                                <h4>
                                    Add Product
                                </h4>

                                <p className="text-muted">

                                    Add new products to
                                    your store inventory.

                                </p>

                            </div>

                        </div>

                    </div>

                    <div className="col-md-4">

                        <div
                            className="card border-0 shadow h-100"
                            style={{
                                cursor: "pointer"
                            }}
                            onClick={() => {

                            

                                navigate(
                                    "/seller/products"
                                );

                            }}
                        >

                            <div className="card-body text-center p-4">

                                <h1>
                                    🛍️
                                </h1>

                                <h4>
                                    My Products
                                </h4>

                                <p className="text-muted">

                                    View and manage all
                                    listed products.

                                </p>

                            </div>

                        </div>

                    </div>

                    <div className="col-md-4">

                        <div
                            className="card border-0 shadow h-100"
                            style={{
                                cursor: "pointer"
                            }}
                            onClick={() => {


                                navigate(
                                    "/seller/orders"
                                );

                            }}
                        >

                            <div className="card-body text-center p-4">

                                <h1>
                                    📦
                                </h1>

                                <h4>
                                    Orders
                                </h4>

                                <p className="text-muted">

                                    Track customer orders
                                    and deliveries.

                                </p>

                            </div>

                        </div>

                    </div>

                </div>

                <SellerStatsCards />

                <div
                    className="bg-white rounded-4 shadow p-4 mt-5"
                >

                    <h3
                        className="fw-bold mb-3"
                    >
                        Store Performance
                    </h3>

                    <div className="row">

                        <div className="col-md-4">

                            <h5>
                                📈 Sales Growth
                            </h5>

                            <p>
                                Monitor sales performance
                                and identify opportunities.
                            </p>

                        </div>

                        <div className="col-md-4">

                            <h5>
                                ⭐ Customer Satisfaction
                            </h5>

                            <p>
                                Keep customers happy
                                with quality products.
                            </p>

                        </div>

                        <div className="col-md-4">

                            <h5>
                                🚚 Order Fulfillment
                            </h5>

                            <p>
                                Manage orders efficiently
                                and ensure timely delivery.
                            </p>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

};

export default SellerDashboard;