import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";


import CustomerNavbar from "../../components/Navbar-Customer";

import ProductCard from "../../components/customer/ProductCard";
import ProductFilters from "../../components/customer/ProductFilters";

const CustomerProducts = () => {

    const [products, setProducts] = useState([]);

    const [categories, setCategories] = useState([]);

    const [keyword, setKeyword] = useState("");

    const [selectedCategory,
        setSelectedCategory] =
        useState("");

    const [minPrice,
        setMinPrice] =
        useState("");

    const [maxPrice,
        setMaxPrice] =
        useState("");

    const [offersOnly, setOffersOnly] =
    useState(false);

    const [currentPage,
        setCurrentPage] =
        useState(1);


    const productsPerPage = 6;

    const [searchParams] =
        useSearchParams();

    const fetchProducts = async () => {

        try {

            const response =
                await axios.get(
                    "http://localhost:8080/api/product/all"
                );

            setProducts(response.data);

        } catch (err) {

            console.log(err);

        }
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

    const applyFilters = async () => {

        try {

            let response;

            if (keyword.trim() !== "") {

                response =
                    await axios.get(
                        `http://localhost:8080/api/product/search?keyword=${keyword}`
                    );

                setProducts(response.data);

                return;
            }

            if (minPrice && maxPrice) {

                response =
                    await axios.get(
                        `http://localhost:8080/api/product/price-range?minPrice=${minPrice}&maxPrice=${maxPrice}`
                    );

                setProducts(response.data);

                return;
            }

            fetchProducts();

        } catch (err) {

            console.log(err);

        }
    };

   const filteredProducts =
    products.filter((product) => {

        const categoryMatch =
            !selectedCategory ||

            (
                product.category?.categoryName
                    ?.toLowerCase()
                    .trim() ===

                selectedCategory
                    ?.toLowerCase()
                    .trim()
            );

        const offerMatch =
            !offersOnly ||

            (
                product.offerPercentage &&
                product.offerPercentage > 0
            );

        return (
            categoryMatch &&
            offerMatch
        );

    });

    const lastIndex =
        currentPage * productsPerPage;

    const firstIndex =
        lastIndex - productsPerPage;

    const currentProducts =
        filteredProducts.slice(
            firstIndex,
            lastIndex
        );

    const totalPages =
        Math.ceil(
            filteredProducts.length /
            productsPerPage
        );

    useEffect(() => {

        const categoryFromUrl = searchParams.get("category");

        if (categoryFromUrl) {

            setSelectedCategory(
                categoryFromUrl
            );

        } else {

            setSelectedCategory("");

        }

    }, [searchParams]);

    useEffect(() => {

        fetchProducts();

        fetchCategories();

    }, []);



    return (

        <div
            style={{
                backgroundColor: "#f8f9fa",
                minHeight: "100vh"
            }}
        >

            <CustomerNavbar />

            <div className="container-fluid py-4">

                <div className="row">

                    <div className="col-md-3">

                        <ProductFilters

                            keyword={keyword}
                            setKeyword={setKeyword}

                            minPrice={minPrice}
                            setMinPrice={setMinPrice}

                            maxPrice={maxPrice}
                            setMaxPrice={setMaxPrice}

                            offersOnly={offersOnly}
                            setOffersOnly={setOffersOnly}

                            categories={categories}

                            selectedCategory={
                                selectedCategory
                            }

                            setSelectedCategory={
                                setSelectedCategory
                            }

                            applyFilters={
                                applyFilters
                            }

                        />

                    </div>

                    <div className="col-md-9">

                        <div
                            className="d-flex justify-content-between align-items-center mb-4"
                        >

                            <h3 className="fw-bold">
                                Products
                            </h3>

                            <span
                                className="badge bg-dark fs-6"
                            >
                                {
                                    filteredProducts.length
                                } Products
                            </span>

                        </div>

                        <div className="row g-4">

                            {
                                currentProducts.map(
                                    (product) => (

                                        <div
                                            key={product.id}
                                            className="col-lg-4 col-md-6"
                                        >

                                            <ProductCard
                                                product={
                                                    product
                                                }
                                            />

                                        </div>

                                    )
                                )
                            }

                        </div>

                        <div
                            className="d-flex justify-content-center mt-5"
                        >
<div className="d-flex justify-content-center mt-5 gap-2">

    <button
        className="btn btn-outline-dark"
        disabled={currentPage === 1}
        onClick={() =>
            setCurrentPage(currentPage - 1)
        }
    >
        Prev
    </button>

    <button
        className="btn btn-dark"
    >
        {currentPage}
    </button>

    <button
        className="btn btn-outline-dark"
        disabled={currentPage === totalPages}
        onClick={() =>
            setCurrentPage(currentPage + 1)
        }
    >
        Next
    </button>

</div>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );
};

export default CustomerProducts;