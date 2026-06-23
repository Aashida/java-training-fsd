import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { toast } from "react-toastify";
import CustomerNavbar from "../../components/Navbar-Customer";

const ProductDetails = () => {

    const { id } = useParams();

    const navigate = useNavigate();

    const [quantity, setQuantity] =
        useState(1);

    const [product, setProduct] =
        useState(null);

    const [selectedImage,
        setSelectedImage] =
        useState("");

    const [averageRating, setAverageRating] =
        useState(0);

    const [reviews, setReviews] =
        useState([]);

    const [rating, setRating] =
        useState(5);

    const [comment, setComment] =
        useState("");

    const fetchProduct = async () => {

        try {

            const response =
                await axios.get(
                    `http://localhost:8080/api/product/get-one/${id}`
                );

            setProduct(response.data);

            if (
                response.data.images &&
                response.data.images.length > 0
            ) {

                setSelectedImage(
                    response.data.images[0]
                );

            }
            else {

                setSelectedImage(
                    response.data.imagePath
                );

            }

        }
        catch (err) {

            console.log(err);

        }

    };

    const fetchRating = async () => {

        try {

            const response =
                await axios.get(
                    `http://localhost:8080/api/review/rating/${id}`
                );

            setAverageRating(
                response.data || 0
            );

        } catch (err) {

            console.log(err);

        }
    };

    const fetchReviews = async () => {

        try {

            const response =
                await axios.get(
                    `http://localhost:8080/api/review/product/${id}`
                );

            setReviews(
                response.data
            );

        } catch (err) {

            console.log(err);

        }
    };

    const submitReview = async () => {

        try {

            await axios.post(
                `http://localhost:8080/api/review/add/${id}`,
                {
                    rating,
                    comment
                },
                {
                    headers: {
                        Authorization:
                            "Bearer " +
                            localStorage.getItem("token")
                    }
                }
            );

            toast.success(
                "Review added successfully"
            );

            setComment("");

            fetchReviews();

            fetchRating();

        } catch (err) {

            toast.warning(
                err.response?.data ||
                "Order product to add review"
            );

        }
    };

    const addToCart = async () => {

        try {

            const token =
                localStorage.getItem("token");

            for (
                let i = 0;
                i < quantity;
                i++
            ) {

                await axios.post(
                    `http://localhost:8080/api/cart/add/${id}`,
                    {},
                    {
                        headers: {
                            Authorization:
                                `Bearer ${token}`
                        }
                    }
                );

            }

            navigate("/customer/cart");

        }
        catch (err) {

            console.log(err);

            toast.warning(
                "Unable to add product to cart"
            );

        }

    };

    useEffect(() => {

        fetchProduct();

        fetchRating();

        fetchReviews();

    }, []);

    if (!product) {

        return (

            <>
                <CustomerNavbar />

                <div className="container py-5">

                    <h3>
                        Loading Product...
                    </h3>

                </div>
            </>

        );

    }

    return (

        <div
            style={{
                backgroundColor: "#f8f9fa",
                minHeight: "100vh"
            }}
        >

            <CustomerNavbar />

            <div className="container py-5">

                <div className="row g-5">

                    {/* Product Image */}

                    <div className="col-lg-7">

                        <div className="card border-0 shadow">

                            <img
                                src={`/images/${selectedImage}`}
                                alt={product.productName}
                                className="img-fluid rounded"
                                style={{
                                    height: "550px",
                                    objectFit: "contain"
                                }}
                            />

                        </div>

                        <div
                            className="d-flex gap-2 mt-3 flex-wrap"
                        >

                            {
                                product.images?.map(
                                    (
                                        image,
                                        index
                                    ) => (

                                        <img
                                            key={index}
                                            src={`/images/${image}`}
                                            alt="thumb"
                                            width="90"
                                            height="90"
                                            style={{
                                                objectFit: "cover",
                                                cursor: "pointer",
                                                border:
                                                    selectedImage === image
                                                        ? "3px solid black"
                                                        : "1px solid #ddd"
                                            }}
                                            onClick={() =>
                                                setSelectedImage(
                                                    image
                                                )
                                            }
                                        />

                                    )
                                )
                            }

                        </div>

                    </div>

                    {/* Product Details */}

                    <div className="col-lg-5">

                        <h1 className="fw-bold mb-3">
                            {product.productName}
                        </h1>

                        <div className="mb-3">

                            <span
                                className="badge bg-warning text-dark fs-6"
                            >
                                ⭐ {averageRating.toFixed(1)} Rating
                            </span>

                        </div>

                        <p className="text-muted fs-5">

                            {product.description}

                        </p>

                        <p>
                            <strong>
                                Category :
                            </strong>

                            {" "}

                            {product.category?.categoryName ||
                                product.categoryName}

                        </p>

                        {
                            product.offerPercentage > 0 && (

                                <div className="mb-2">

                                    <span
                                        className="text-decoration-line-through text-muted me-2"
                                    >
                                        ₹{product.price}
                                    </span>

                                    <span
                                        className="badge bg-danger"
                                    >
                                        {product.offerPercentage}% OFF
                                    </span>

                                </div>
                            )
                        }

                        <h2
                            className="fw-bold text-success mb-3"
                        >
                            ₹{
                                product.offerPercentage > 0

                                    ? product.price -
                                    (
                                        product.price *
                                        product.offerPercentage
                                    ) / 100

                                    : product.price
                            }
                        </h2>
                        {
                            product.stock > 0 ? (

                                <p>
                                    <span className="badge bg-success fs-6">
                                        In Stock : {product.stock}
                                    </span>
                                </p>

                            ) : (

                                <p>
                                    <span className="badge bg-danger fs-6">
                                        Out Of Stock
                                    </span>
                                </p>

                            )
                        }

                        <p
                            className="text-success fw-bold"
                        >
                            FREE Delivery
                        </p>

                        <hr />



                        <div className="mb-4">

                            <h6 className="fw-bold mb-3">
                                Quantity
                            </h6>

                            <div className="d-flex align-items-center">

                                <button
                                    className="btn btn-outline-secondary"
                                    onClick={() =>
                                        setQuantity(
                                            Math.max(
                                                1,
                                                quantity - 1
                                            )
                                        )
                                    }
                                >
                                    -
                                </button>

                                <span
                                    className="mx-4 fs-4 fw-bold"
                                >
                                    {quantity}
                                </span>

                                <button
                                    className="btn btn-outline-secondary"
                                    onClick={() =>
                                        setQuantity(
                                            Math.min(
                                                product.stock,
                                                quantity + 1
                                            )
                                        )
                                    }
                                >
                                    +
                                </button>

                            </div>

                        </div>

                        {
    product.stock === 0 && (
        <div className="alert alert-danger">
            This product is currently out of stock.
        </div>
    )
}

                        <div className="d-flex gap-3">

                        

                            <button
                                className="btn btn-dark btn-lg"
                                onClick={addToCart}
                                disabled={product.stock === 0}
                            >
                                Add To Cart
                            </button>

                            <button
                                className="btn btn-warning btn-lg"
                                onClick={() =>
                                    navigate("/customer/cart")
                                }
                                disabled={product.stock === 0}
                            >
                                Buy Now
                            </button>

                        </div>

                        <hr className="my-4" />

                        <h4 className="mb-3">
                            Write a Review
                        </h4>

                        <div className="mb-3">

                            <label className="form-label">
                                Rating
                            </label>

                            <select
                                className="form-select"
                                value={rating}
                                onChange={(e) =>
                                    setRating(
                                        Number(
                                            e.target.value
                                        )
                                    )
                                }
                            >

                                <option value="5">
                                    ⭐⭐⭐⭐⭐
                                </option>

                                <option value="4">
                                    ⭐⭐⭐⭐
                                </option>

                                <option value="3">
                                    ⭐⭐⭐
                                </option>

                                <option value="2">
                                    ⭐⭐
                                </option>

                                <option value="1">
                                    ⭐
                                </option>

                            </select>

                        </div>

                        <div className="mb-3">

                            <textarea
                                className="form-control"
                                rows="3"
                                placeholder="Write your review..."
                                value={comment}
                                onChange={(e) =>
                                    setComment(
                                        e.target.value
                                    )
                                }
                            />

                        </div>

                        <button
                            className="btn btn-warning btn-lg"
                            onClick={submitReview}
                        >
                            Submit Review
                        </button>

                    </div>

                </div>

            </div>

            <div className="container pb-5">

                <h3 className="mb-4">
                    Customer Reviews
                </h3>

                {
                    reviews.length === 0 &&
                    <p>
                        No reviews yet.
                    </p>
                }

                {
                    reviews.map(
                        (
                            review,
                            index
                        ) => (

                            <div
                                key={index}
                                className="card shadow-sm mb-3"
                            >

                                <div className="card-body">

                                    <h6>
                                        {
                                            review.customerName
                                        }
                                    </h6>

                                    <p>
                                        {
                                            "⭐".repeat(
                                                review.rating
                                            )
                                        }
                                    </p>

                                    <p>
                                        {
                                            review.comment
                                        }
                                    </p>

                                </div>

                            </div>

                        )
                    )
                }

            </div>

        </div>


    );
};

export default ProductDetails;