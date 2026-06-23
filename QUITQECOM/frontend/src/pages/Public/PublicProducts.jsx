import axios from "axios";
import { useEffect, useState } from "react";

import { useSelector } from "react-redux";

import {
    useNavigate
} from "react-router-dom";

import {
    toast
} from "react-toastify";

import Navbar from "../../components/Navbar";

const PublicProducts = () => {

    const [products, setProducts] =
        useState([]);

    const [currentPage, setCurrentPage] =
        useState(1);

    const productsPerPage = 6;

    const navigate =
        useNavigate();

    const selectedCategory =
        useSelector(
            state =>
                state.category.selectedCategory
        );

    const handleViewProduct = (
        productId
    ) => {

        toast.warning(
            "Please login to view product"
        );

        setTimeout(() => {

            navigate(
                "/login"
            );

        }, 1500);

    };

    const fetchProducts =
        async () => {

            try {

                const response =
                    await axios.get(
                        "http://localhost:8080/api/product/all"
                    );

                setProducts(
                    response.data
                );

            }
            catch (err) {

                console.log(err);

            }

        };

    useEffect(() => {

        fetchProducts();

    }, []);

    useEffect(() => {

        setCurrentPage(1);

    }, [selectedCategory]);

    const filteredProducts =
        products.filter(
            product =>

                !selectedCategory ||

                product.category?.categoryName ===
                selectedCategory
        );

    const totalPages =
        Math.ceil(
            filteredProducts.length /
            productsPerPage
        );

    const startIndex =
        (currentPage - 1) *
        productsPerPage;

    const paginatedProducts =
        filteredProducts.slice(
            startIndex,
            startIndex + productsPerPage
        );

    return (

        <div
            style={{
                backgroundColor: "#f8f9fa",
                minHeight: "100vh"
            }}
        >

            <Navbar />

            <div className="container py-5">

                <h2 className="fw-bold mb-4">

                    Products

                    {
                        selectedCategory &&

                        <span
                            className="ms-3 badge bg-dark"
                        >

                            {
                                selectedCategory
                            }

                        </span>

                    }

                </h2>

                <div className="row g-4">

                    {
                        paginatedProducts.map(
                            product => (

                                <div
                                    key={product.id}
                                    className="col-md-4"
                                >

                                    <div
                                        className="card h-100 shadow-sm border-0"
                                    >

                                        <img
                                            src={`/images/${product.imagePath}`}
                                            alt={product.productName}
                                            className="card-img-top"
                                            style={{
                                                height: "250px",
                                                objectFit: "cover"
                                            }}
                                        />

                                        <div className="card-body d-flex flex-column">

                                            <h5>
                                                {
                                                    product.productName
                                                }
                                            </h5>

                                            <p>
                                                ₹{
                                                    product.price
                                                }
                                            </p>

                                            <span
                                                className="badge bg-secondary align-self-start"
                                            >

                                                {
                                                    product.category?.categoryName
                                                }

                                            </span>

                                            <div className="mt-auto pt-3">

                                                <button
                                                    className="btn btn-dark w-100"
                                                    onClick={() =>
                                                        handleViewProduct(
                                                            product.id
                                                        )
                                                    }
                                                >
                                                    View Product
                                                </button>

                                            </div>

                                        </div>

                                    </div>

                                </div>

                            )
                        )
                    }

                </div>

                {
                    totalPages > 1 && (

                        <div className="d-flex justify-content-center align-items-center mt-5">

                            <button
                                className="btn btn-dark me-2"
                                disabled={
                                    currentPage === 1
                                }
                                onClick={() =>
                                    setCurrentPage(
                                        currentPage - 1
                                    )
                                }
                            >
                                Prev
                            </button>

                            <button
                                className="btn btn-dark me-2"
                            >
                                {currentPage}
                            </button>

                            <button
                                className="btn btn-dark"
                                disabled={
                                    currentPage === totalPages
                                }
                                onClick={() =>
                                    setCurrentPage(
                                        currentPage + 1
                                    )
                                }
                            >
                                Next
                            </button>

                        </div>

                    )
                }

            </div>

        </div>

    );

};

export default PublicProducts;