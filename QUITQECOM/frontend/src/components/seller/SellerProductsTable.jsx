import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const SellerProductsTable = () => {

    const navigate = useNavigate();

    const [products, setProducts] =
        useState([]);

    const [currentPage,
        setCurrentPage] =
        useState(1);

    const productsPerPage = 5;

    const fetchProducts = async () => {

        try {

            const token =
                localStorage.getItem("token");

            const config = {
                headers: {
                    Authorization:
                        "Bearer " + token
                }
            };

            const response =
                await axios.get(
                    "http://localhost:8080/api/seller/products",
                    config
                );

            setProducts(
                response.data
            );

        } catch (err) {

            console.log(err);

        }
    };

    const deleteProduct = async (
        id
    ) => {

        try {

            const token =
                localStorage.getItem("token");

            const config = {
                headers: {
                    Authorization:
                        "Bearer " + token
                }
            };

            await axios.delete(
                `http://localhost:8080/api/product/delete/${id}`,
                config
            );

            fetchProducts();

        } catch (err) {

            console.log(err);

        }
    };

    useEffect(() => {

        fetchProducts();

    }, []);

    const lastIndex =
        currentPage * productsPerPage;

    const firstIndex =
        lastIndex - productsPerPage;

    const currentProducts =
        products.slice(
            firstIndex,
            lastIndex
        );

    const totalPages =
        Math.ceil(
            products.length /
            productsPerPage
        );

    return (

        <div className="card border-0 shadow-sm">

            <div className="card-body">

                <div
                    className="d-flex justify-content-between align-items-center mb-4"
                >

                    <h4 className="fw-bold">
                        My Products
                    </h4>

                    <span
                        className="badge bg-primary"
                    >
                        {products.length} Products
                    </span>

                </div>

                <div
                    className="table-responsive"
                >

                    <table
                        className="table align-middle"
                    >

                        <thead
                            className="table-light"
                        >

                            <tr>

                                <th>ID</th>

                                <th>
                                    Product
                                </th>

                                <th>
                                    Description
                                </th>

                                <th>
                                    Price
                                </th>

                                <th>
                                    Stock
                                </th>

                                <th>
                                    Category
                                </th>

                                <th>
                                    Offer
                                </th>

                                <th>
                                    Image
                                </th>

                                <th>
                                    Action
                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {
                                currentProducts.map(
                                    (product) => (

                                        <tr
                                            key={
                                                product.id
                                            }
                                        >

                                            <td>
                                                {
                                                    product.id
                                                }
                                            </td>

                                            <td>

                                                <strong>

                                                    {
                                                        product.productName
                                                    }

                                                </strong>

                                            </td>

                                            <td>
                                                {
                                                    product.description
                                                }
                                            </td>

                                            <td>

                                                ₹
                                                {
                                                    product.price
                                                }

                                            </td>

                                            <td>
                                                {
                                                    product.stock
                                                }
                                            </td>

                                            <td>

                                                {
                                                    product.categoryName
                                                }

                                            </td>

                                            <td>

                                                {
                                                    product.offerPercentage || 0
                                                }
                                                %

                                            </td>

                                            <td>

                                                <img
                                                    src={`/images/${product.imagePath}`}
                                                    alt={
                                                        product.productName
                                                    }
                                                    width="70"
                                                    height="70"
                                                    style={{
                                                        objectFit: "cover",
                                                        borderRadius: "10px"
                                                    }}
                                                />

                                            </td>

                                            <td
                                                className="d-flex gap-2"
                                            >

                                                <button
                                                    className="btn btn-warning btn-sm"
                                                    onClick={() =>
                                                        navigate(
                                                            `/seller/edit-product/${product.id}`
                                                        )
                                                    }
                                                >
                                                    Edit
                                                </button>

                                                <button
                                                    className="btn btn-danger btn-sm"
                                                    onClick={() =>
                                                        deleteProduct(
                                                            product.id
                                                        )
                                                    }
                                                >
                                                    Delete
                                                </button>

                                            </td>

                                        </tr>

                                    )
                                )
                            }

                            {
                                currentProducts.length === 0 && (

                                    <tr>

                                        <td
                                            colSpan="9"
                                            className="text-center"
                                        >
                                            No Products Found
                                        </td>

                                    </tr>

                                )
                            }

                        </tbody>

                    </table>

                </div>

                {
                    totalPages > 1 && (

                        <div
                            className="d-flex justify-content-center mt-4 gap-2"
                        >

                            <button
                                className="btn btn-outline-primary"
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
                                className="btn btn-primary"
                            >
                                {
                                    currentPage
                                }
                            </button>

                            <button
                                className="btn btn-outline-primary"
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

export default SellerProductsTable;