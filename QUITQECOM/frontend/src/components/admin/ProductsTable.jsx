import axios from "axios";
import { useEffect, useState } from "react";

const ProductsTable = () => {

    const [products, setProducts] = useState([]);

    const [categories, setCategories] =
        useState([]);

    const [shops, setShops] =
        useState([]);

    const [page, setPage] =
        useState(0);

    const [totalPages, setTotalPages] =
        useState(0);

    const [search, setSearch] =
        useState("");

    const [category, setCategory] =
        useState("");

    const [seller, setSeller] =
        useState("");

    const [inStock, setInStock] =
        useState("");

    const [direction, setDirection] =
        useState("asc");

    const size = 5;

    const getConfig = () => {

        const token =
            localStorage.getItem("token");

        return {

            headers: {

                Authorization:
                    "Bearer " + token

            }

        };
    };

    const fetchProducts = async () => {

        try {

            const response =
                await axios.get(

                    `http://localhost:8080/api/admin/products?page=${page}&size=${size}&search=${search}&category=${category}&seller=${seller}&inStock=${inStock}&direction=${direction}`,

                    getConfig()

                );

            setProducts(
                response.data.products
            );

            setTotalPages(
                response.data.totalPages
            );

        } catch (err) {

            console.log(err);

        }
    };

    const fetchCategories =
        async () => {

            try {

                const response =
                    await axios.get(

                        "http://localhost:8080/api/admin/categories",

                        getConfig()

                    );

                setCategories(
                    response.data
                );

            } catch (err) {

                console.log(err);

            }
        };

    const fetchShops =
        async () => {

            try {

                const response =
                    await axios.get(

                        "http://localhost:8080/api/admin/shops",

                        getConfig()

                    );

                setShops(
                    response.data
                );

            } catch (err) {

                console.log(err);

            }
        };

    useEffect(() => {

        fetchProducts();

    }, [
        page,
        search,
        category,
        seller,
        inStock,
        direction
    ]);

    useEffect(() => {

        fetchCategories();

        fetchShops();

    }, []);

    return (

        <div className="card shadow border-0">

            <div className="card-body">

                <div className="row mb-4">

                    <div className="col-md-3">

                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search Product"
                            value={search}
                            onChange={(e) => {

                                setPage(0);

                                setSearch(
                                    e.target.value
                                );

                            }}
                        />

                    </div>

                    <div className="col-md-2">

                        <select
                            className="form-select"
                            value={category}
                            onChange={(e) => {

                                setPage(0);

                                setCategory(
                                    e.target.value
                                );

                            }}
                        >

                            <option value="">
                                All Categories
                            </option>

                            {
                                categories.map(
                                    (c) => (

                                        <option
                                            key={c}
                                            value={c}
                                        >
                                            {c}
                                        </option>

                                    )
                                )
                            }

                        </select>

                    </div>

                    <div className="col-md-2">

                        <select
                            className="form-select"
                            value={seller}
                            onChange={(e) => {

                                setPage(0);

                                setSeller(
                                    e.target.value
                                );

                            }}
                        >

                            <option value="">
                                All Sellers
                            </option>

                            {
                                shops.map(
                                    (shop) => (

                                        <option
                                            key={shop}
                                            value={shop}
                                        >
                                            {shop}
                                        </option>

                                    )
                                )
                            }

                        </select>

                    </div>

                    <div className="col-md-2">

                        <select
                            className="form-select"
                            value={inStock}
                            onChange={(e) => {

                                setPage(0);

                                setInStock(
                                    e.target.value
                                );

                            }}
                        >

                            <option value="">
                                All Stock
                            </option>

                            <option value="true">
                                In Stock
                            </option>

                            <option value="false">
                                Out Of Stock
                            </option>

                        </select>

                    </div>

                    <div className="col-md-3">

                        <select
                            className="form-select"
                            value={direction}
                            onChange={(e) => {

                                setPage(0);

                                setDirection(
                                    e.target.value
                                );

                            }}
                        >

                            <option value="asc">
                                Price Low → High
                            </option>

                            <option value="desc">
                                Price High → Low
                            </option>

                        </select>

                    </div>

                </div>

                <table className="table table-hover">

                    <thead className="table-dark">

                        <tr>

                            <th>ID</th>

                            <th>Product</th>

                            <th>Price</th>

                            <th>Stock</th>

                            <th>Category</th>

                            <th>Seller</th>

                        </tr>

                    </thead>

                    <tbody>

                        {
                            products.map(
                                (product) => (

                                    <tr
                                        key={
                                            product.productId
                                        }
                                    >

                                        <td>
                                            {
                                                product.productId
                                            }
                                        </td>

                                        <td>
                                            {
                                                product.productName
                                            }
                                        </td>

                                        <td>
                                            ₹
                                            {
                                                product.price
                                            }
                                        </td>

                                        <td>

                                            <span
                                                className={
                                                    product.stock > 0
                                                        ? "badge bg-success"
                                                        : "badge bg-danger"
                                                }
                                            >

                                                {
                                                    product.stock
                                                }

                                            </span>

                                        </td>

                                        <td>
                                            {
                                                product.categoryName
                                            }
                                        </td>

                                        <td>
                                            {
                                                product.sellerName
                                            }
                                        </td>

                                    </tr>

                                )
                            )
                        }

                    </tbody>

                </table>

                <div
                    className="
                        d-flex
                        justify-content-center
                        align-items-center
                        mt-4
                    "
                >

                    <button
                        className="
                            btn
                            btn-secondary
                            me-3
                        "
                        disabled={
                            page === 0
                        }
                        onClick={() =>
                            setPage(
                                page - 1
                            )
                        }
                    >
                        Previous
                    </button>

                    <span>

                        Page

                        {" "}

                        {
                            page + 1
                        }

                        {" "}of{" "}

                        {
                            totalPages
                        }

                    </span>

                    <button
                        className="
                            btn
                            btn-secondary
                            ms-3
                        "
                        disabled={
                            page ===
                            totalPages - 1
                        }
                        onClick={() =>
                            setPage(
                                page + 1
                            )
                        }
                    >
                        Next
                    </button>

                </div>

            </div>

        </div>

    );
};

export default ProductsTable;