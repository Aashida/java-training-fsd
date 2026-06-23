import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const CustomerNavbar = () => {

    const navigate = useNavigate();

    const [categories, setCategories] =
        useState([]);

    const username =
        localStorage.getItem("username");

    const logout = () => {

        localStorage.clear();

        navigate("/login");
    };

    const fetchCategories = async () => {

        try {

            const response =
                await axios.get(
                    "http://localhost:8080/api/category/all"
                );

            setCategories(response.data);

        } catch (err) {

            console.log(err);

        }
    };

    useEffect(() => {

        fetchCategories();

    }, []);

    return (

        <nav className="navbar navbar-expand-lg bg-white shadow-sm py-3">

            <div className="container">

                <Link
                    to="/customer"
                    className="navbar-brand fw-bold fs-3"
                >
                    🛒 QuitQ
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
                                to="/customer"
                                className="nav-link"
                            >
                                Home
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link
                                to="/customer/products"
                                className="nav-link"
                            >
                                Products
                            </Link>
                        </li>

                        <li className="nav-item dropdown">

                            <a
                                href="#"
                                className="nav-link dropdown-toggle"
                                data-bs-toggle="dropdown"
                            >
                                Categories
                            </a>

                            <ul className="dropdown-menu">

                                {
                                    categories.map(
                                        (category) => (

                                            <li
                                                key={category.id}
                                            >

                                                <Link
                                                    className="dropdown-item"
                                                    to={`/customer/products?category=${category.categoryName}`}
                                                >
                                                    {
                                                        category.categoryName
                                                    }
                                                </Link>

                                            </li>

                                        )
                                    )
                                }

                            </ul>

                        </li>

                        <li className="nav-item">

                            <Link
                                to="/customer/orders"
                                className="nav-link"
                            >
                                My Orders
                            </Link>

                        </li>

                        <li className="nav-item">

                            <Link
                                to="/customer/cart"
                                className="nav-link"
                            >
                                My Cart
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
                                    to="/customer/profile"
                                >
                                    My Profile
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

export default CustomerNavbar;