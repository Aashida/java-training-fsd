import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { toast } from "react-toastify";
import SellerNavbar from "../../components/Navbar-Seller";

const SellerEditProduct = () => {

    const { id } = useParams();

    const navigate = useNavigate();

    const [product, setProduct] = useState({
        productName: "",
        description: "",
        price: "",
        stock: "",
        offerPercentage: 0
    });

    const fetchProduct = async () => {

        try {

            const response =
                await axios.get(
                    `http://localhost:8080/api/product/get-one/${id}`
                );

            setProduct({
                productName:
                    response.data.productName,
                description:
                    response.data.description,
                price:
                    response.data.price,
                stock:
                    response.data.stock,
                offerPercentage:
                    response.data.offerPercentage || 0
            });

        }
        catch (err) {

            console.log(err);

        }

    };

    const updateProduct = async (e) => {

        e.preventDefault();

        try {

            const token =
                localStorage.getItem("token");

            await axios.put(
                `http://localhost:8080/api/product/update/${id}`,
                product,
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );

            toast.success(
                "Product Updated Successfully"
            );

            navigate(
                "/seller/products"
            );

        }
        catch (err) {

            console.log(err);

            toast.warning(
                "Failed to update product"
            );

        }

    };

    useEffect(() => {

        fetchProduct();

    }, []);

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
                    className="card shadow-sm border-0 mx-auto"
                    style={{
                        maxWidth: "800px"
                    }}
                >

                    <div className="card-body p-5">

                        <h2 className="fw-bold mb-4">
                            Edit Product
                        </h2>

                        <form
                            onSubmit={updateProduct}
                        >

                            <div className="mb-3">

                                <label>
                                    Product Name
                                </label>

                                <input
                                    type="text"
                                    className="form-control"
                                    value={product.productName}
                                    onChange={(e) =>
                                        setProduct({
                                            ...product,
                                            productName:
                                                e.target.value
                                        })
                                    }
                                    required
                                />

                            </div>

                            <div className="mb-3">

                                <label>
                                    Description
                                </label>

                                <textarea
                                    rows="4"
                                    className="form-control"
                                    value={product.description}
                                    onChange={(e) =>
                                        setProduct({
                                            ...product,
                                            description:
                                                e.target.value
                                        })
                                    }
                                    required
                                />

                            </div>

                            <div className="row">

                                <div className="col-md-4 mb-3">

                                    <label>
                                        Price
                                    </label>

                                    <input
                                        type="number"
                                        className="form-control"
                                        value={product.price}
                                        onChange={(e) =>
                                            setProduct({
                                                ...product,
                                                price:
                                                    e.target.value
                                            })
                                        }
                                        required
                                    />

                                </div>

                                <div className="col-md-4 mb-3">

                                    <label>
                                        Stock
                                    </label>

                                    <input
                                        type="number"
                                        className="form-control"
                                        value={product.stock}
                                        onChange={(e) =>
                                            setProduct({
                                                ...product,
                                                stock:
                                                    e.target.value
                                            })
                                        }
                                        required
                                    />

                                </div>

                                <div className="col-md-4 mb-3">

                                    <label>
                                        Offer %
                                    </label>

                                    <input
                                        type="number"
                                        className="form-control"
                                        value={
                                            product.offerPercentage
                                        }
                                        onChange={(e) =>
                                            setProduct({
                                                ...product,
                                                offerPercentage:
                                                    e.target.value
                                            })
                                        }
                                    />

                                </div>

                            </div>

                            <button
                                type="submit"
                                className="btn btn-warning"
                            >
                                Update Product
                            </button>

                        </form>

                    </div>

                </div>

            </div>

        </div>

    );
};

export default SellerEditProduct;