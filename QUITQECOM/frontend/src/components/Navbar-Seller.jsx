import { Link, useNavigate } from "react-router-dom";

const SellerNavbar = () => {

    const navigate = useNavigate();

    const logout = () => {

        localStorage.clear();

        navigate("/login");

    };

    const username =
        localStorage.getItem("username");

    return (

        <nav className="navbar navbar-expand-lg bg-white shadow-sm py-3">

            <div className="container">

                <Link
                    to="/seller"
                    className="navbar-brand fw-bold fs-3"
                >
                    🛒 QuitQ Seller
                </Link>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarContent"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div
                    className="collapse navbar-collapse"
                    id="navbarContent"
                >

                    <ul className="navbar-nav mx-auto gap-3">

                        <li className="nav-item">
                            <Link
                                to="/seller"
                                className="nav-link"
                            >
                                Dashboard
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link
                                to="/seller/products"
                                className="nav-link"
                            >
                                My Products
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link
                                to="/seller/add-product"
                                className="nav-link"
                            >
                                Add Product
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link
                                to="/seller/orders"
                                className="nav-link"
                            >
                                Orders
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link
                                to="/seller/revenue"
                                className="nav-link"
                            >
                                Reports
                            </Link>
                        </li>

                    </ul>

                   

                    <div className="dropdown">

                        <button
                            className="btn btn-dark rounded-pill dropdown-toggle"
                            data-bs-toggle="dropdown"
                        >
                            {username}
                        </button>

                        <ul className="dropdown-menu dropdown-menu-end">

                            <li>

                                <Link
                                    className="dropdown-item"
                                    to="/seller/profile"
                                >
                                    Profile
                                </Link>

                            </li>

                            <li>

                                <hr className="dropdown-divider" />

                            </li>

                            <li>

                                <button
                                    className="dropdown-item text-danger"
                                    onClick={logout}
                                >
                                    Logout
                                </button>

                            </li>

                        </ul>

                    </div>

                </div>

            </div>

        </nav>

    );
};

export default SellerNavbar;