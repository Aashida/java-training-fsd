import axios from "axios";
import { useEffect, useState } from "react";

import {
    useLocation
} from "react-router-dom";

import Navbar from "./Navbar";

const SearchProducts = () => {

    const [products, setProducts] =
        useState([]);

    const location =
        useLocation();

    const keyword =
        new URLSearchParams(
            location.search
        ).get("keyword");

    const fetchProducts =
        async () => {

            try {

                const response =
                    await axios.get(
                        `http://localhost:8080/api/product/search?keyword=${keyword}`
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

        if (keyword) {

            fetchProducts();

        }

    }, [keyword]);

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

                    Search Results

                    <span
                        className="ms-3 badge bg-dark"
                    >
                        {keyword}
                    </span>

                </h2>

                <div className="row g-4">

                    {
                        products.map(
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

                                        <div className="card-body">

                                            <h5>
                                                {product.productName}
                                            </h5>

                                            <p>
                                                ₹{product.price}
                                            </p>

                                            <span
                                                className="badge bg-secondary"
                                            >
                                                {
                                                    product.category?.categoryName
                                                }
                                            </span>

                                        </div>

                                    </div>

                                </div>

                            )
                        )
                    }

                </div>

            </div>

        </div>

    );

};

export default SearchProducts;