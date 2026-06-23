import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import SellerNavbar from "../../components/Navbar-Seller";

const SellerAddProduct = () => {

    const [categories, setCategories] = useState([]);

    const [files, setFiles] = useState([]);

    const [previews, setPreviews] = useState([]);

    const [product, setProduct] = useState({
        productName: "",
        description: "",
        price: "",
        stock: "",
        categoryName: ""
    });

    const fetchCategories = async () => {

        try {

            const response = await axios.get(
                "http://localhost:8080/api/category/all"
            );

            setCategories(response.data);

        } catch (err) {
            console.log(err);
        }
    };

    const addProduct = async (e) => {

        e.preventDefault();

        try {

            const token = localStorage.getItem("token");

            const config = {
                headers: {
                    Authorization: "Bearer " + token,
                    "Content-Type": "multipart/form-data"
                }
            };

            const formData = new FormData();

            formData.append(
                "productName",
                product.productName
            );

            formData.append(
                "description",
                product.description
            );

            formData.append(
                "price",
                product.price
            );

            formData.append(
                "stock",
                product.stock
            );

            formData.append(
    "categoryName",
    product.categoryName
);

            files.forEach(file => {

                formData.append(
                    "files",
                    file
                );

            });


            await axios.post(
                "http://localhost:8080/api/product/addV2",
                formData,
                config
            );

            toast.success("Product Added Successfully");

            setProduct({
                productName: "",
                description: "",
                price: "",
                stock: "",
                categoryName: ""
            });

            setFiles([]);
            setPreviews([]);

        } catch (err) {

            console.log(err);

            toast.warning("Failed to add product");

        }
    };

    useEffect(() => {
        fetchCategories();
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
                    className="card border-0 shadow-sm mx-auto"
                    style={{
                        maxWidth: "850px",
                        borderRadius: "20px"
                    }}
                >

                    <div className="card-body p-5">

                        <h2 className="fw-bold mb-4">
                            Add New Product
                        </h2>

                        <form onSubmit={addProduct}>

                            <div className="mb-3">

                                <label className="form-label">
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

                                <label className="form-label">
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

                                <div className="col-md-6 mb-3">

                                    <label className="form-label">
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

                                <div className="col-md-6 mb-3">

                                    <label className="form-label">
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

                            </div>

                            <div className="mb-4">

                                <label className="form-label">
                                    Category
                                </label>

                                <select
                                    className="form-select"
                                    value={product.categoryName}
                                    onChange={(e) =>
                                        setProduct({
                                            ...product,
                                            categoryName:
                                                e.target.value
                                        })
                                    }
                                    required
                                >

                                    <option value="">
                                        Select Category
                                    </option>

                                    {
                                        categories.map(
                                            (category) => (

                                                <option
                                                    key={category.id}
                                                    value={
                                                        category.categoryName
                                                    }
                                                >
                                                    {
                                                        category.categoryName
                                                    }
                                                </option>

                                            )
                                        )
                                    }

                                </select>

                            </div>

                            <div className="mb-4">

                                <label className="form-label">
                                    Product Image
                                </label>

                                <input
                                    type="file"
                                    multiple
                                    className="form-control"
                                    accept="image/*"
                                    onChange={(e) => {

                                        const selectedFiles =
                                            Array.from(
                                                e.target.files
                                            );

                                        setFiles(
                                            selectedFiles
                                        );

                                        setPreviews(
                                            selectedFiles.map(
                                                file =>
                                                    URL.createObjectURL(
                                                        file
                                                    )
                                            )
                                        );

                                    }}
                                    required
                                />

                            </div>

                            {
                                previews.length > 0 &&

                                <div className="row g-3 mb-4">

                                    {
                                        previews.map(
                                            (
                                                preview,
                                                index
                                            ) => (

                                                <div
                                                    key={index}
                                                    className="col-md-3"
                                                >

                                                    <img
                                                        src={preview}
                                                        alt="Preview"
                                                        className="img-fluid rounded shadow-sm"
                                                        style={{
                                                            height: "150px",
                                                            objectFit: "cover"
                                                        }}
                                                    />

                                                </div>

                                            )
                                        )
                                    }

                                </div>
                            }

                            <button
                                type="submit"
                                className="btn btn-dark px-4"
                            >
                                Add Product
                            </button>

                        </form>

                    </div>

                </div>

            </div>

        </div>
    );
};

export default SellerAddProduct;