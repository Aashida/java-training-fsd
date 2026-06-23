import { useState } from "react";

import {
    Link,
    useNavigate
} from "react-router-dom";

const Navbar = () => {

    const [searchText, setSearchText] =
        useState("");

    const navigate =
        useNavigate();

    const handleSearch = (
        e
    ) => {

        if (e.key === "Enter") {

            e.preventDefault();

            if (
                searchText.trim()
            ) {

                navigate(
                    `/search-products?keyword=${searchText}`
                );

            }

        }

    };

    return (

        <nav className="navbar navbar-expand-lg bg-white shadow-sm py-3">

            <div className="container">

                <Link
                    to="/"
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
                                to="/"
                                className="nav-link"
                            >
                                Home
                            </Link>

                        </li>

                        <li className="nav-item">

                            <Link
                                to="/products"
                                className="nav-link"
                            >
                                Products
                            </Link>

                        </li>

                        <li className="nav-item">

                            <Link
                                to="/categories"
                                className="nav-link"
                            >
                                Categories
                            </Link>

                        </li>

                        <li className="nav-item">

                            <Link
                                to="/register/seller"
                                className="nav-link"
                            >
                                Become a Seller
                            </Link>

                        </li>

                    </ul>

                    <form
                        className="d-flex me-3"
                    >

                        <input
                            type="search"
                            className="form-control rounded-pill"
                            placeholder="🔍 Search products..."
                            value={
                                searchText
                            }
                            onChange={
                                (e) =>
                                    setSearchText(
                                        e.target.value
                                    )
                            }
                            onKeyDown={
                                handleSearch
                            }
                        />

                    </form>

                    <Link to="/login">

                        <button
                            className="btn btn-dark rounded-pill px-4"
                        >
                            Login
                        </button>

                    </Link>

                </div>

            </div>

        </nav>

    );

};

export default Navbar;