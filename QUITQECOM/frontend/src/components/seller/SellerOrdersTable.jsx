import axios from "axios";
import { useEffect, useState } from "react";

const SellerOrdersTable = () => {

    const [orders, setOrders] =
        useState([]);

    const [currentPage,
        setCurrentPage] =
        useState(1);

    const [statusFilter,
        setStatusFilter] =
        useState("");

    const [sortBy,
        setSortBy] =
        useState("orderId");

    const ordersPerPage = 5;

    const fetchOrders = async () => {

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
                    "http://localhost:8080/api/seller/orders",
                    config
                );

            setOrders(
                response.data
            );

        } catch (err) {

            console.log(err);

        }
    };

    useEffect(() => {

        fetchOrders();

    }, []);

    const sortedOrders =
        [...orders].sort((a, b) => {

            if (sortBy === "orderId") {

                return (
                    a.orderId -
                    b.orderId
                );

            }

            if (sortBy === "quantity") {

                return (
                    a.quantity -
                    b.quantity
                );

            }

            if (sortBy === "price") {

                return (
                    a.priceAtPurchase -
                    b.priceAtPurchase
                );

            }

            return 0;

        });

    const filteredOrders =
        sortedOrders.filter(
            (order) =>

                !statusFilter ||

                order.status ===
                statusFilter
        );

    const lastIndex =
        currentPage * ordersPerPage;

    const firstIndex =
        lastIndex - ordersPerPage;

    const currentOrders =
        filteredOrders.slice(
            firstIndex,
            lastIndex
        );

    const totalPages =
        Math.ceil(
            filteredOrders.length /
            ordersPerPage
        );

    return (

        <div className="card border-0 shadow-sm">

            <div className="card-body">

                <div
                    className="d-flex justify-content-between align-items-center mb-4"
                >

                    <h4 className="fw-bold">
                        Seller Orders
                    </h4>

                    <span
                        className="badge bg-primary"
                    >
                        {
                            filteredOrders.length
                        } Orders
                    </span>

                </div>

                <div
                    className="d-flex gap-3 mb-4"
                >

                    <select
                        className="form-select w-auto"
                        value={statusFilter}
                        onChange={(e) => {

                            setStatusFilter(
                                e.target.value
                            );

                            setCurrentPage(1);

                        }}
                    >

                        <option value="">
                            All Orders
                        </option>

                        <option value="PLACED">
                            Placed
                        </option>

                        <option value="CANCELLED">
                            Cancelled
                        </option>

                    </select>

                    <select
                        className="form-select w-auto"
                        value={sortBy}
                        onChange={(e) =>
                            setSortBy(
                                e.target.value
                            )
                        }
                    >

                        <option value="orderId">
                            Sort By Order ID
                        </option>

                        <option value="quantity">
                            Sort By Quantity
                        </option>

                        <option value="price">
                            Sort By Purchase Price
                        </option>

                    </select>

                </div>

                <div
                    className="table-responsive"
                >

                    <table
                        className="table table-hover align-middle"
                    >

                        <thead
                            className="table-light"
                        >

                            <tr>

                                <th>
                                    Order ID
                                </th>

                                <th>
                                    Product
                                </th>

                                <th>
                                    Quantity
                                </th>

                                <th>
                                    Current Price
                                </th>

                                <th>
                                    Purchase Price
                                </th>

                                <th>
                                    Status
                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {
                                currentOrders.map(
                                    (
                                        order,
                                        index
                                    ) => (

                                        <tr
                                            key={index}
                                        >

                                            <td>
                                                #
                                                {
                                                    order.orderId
                                                }
                                            </td>

                                            <td>
                                                {
                                                    order.productName
                                                }
                                            </td>

                                            <td>
                                                {
                                                    order.quantity
                                                }
                                            </td>

                                            <td>
                                                ₹
                                                {
                                                    order.productPrice
                                                }
                                            </td>

                                            <td>
                                                ₹
                                                {
                                                    order.priceAtPurchase
                                                }
                                            </td>

                                            <td>

                                                <span
                                                    className={
                                                        order.status ===
                                                        "CANCELLED"

                                                            ? "badge bg-danger"

                                                            : "badge bg-success"
                                                    }
                                                >

                                                    {
                                                        order.status
                                                    }

                                                </span>

                                            </td>

                                        </tr>

                                    )
                                )
                            }

                            {
                                currentOrders.length === 0 && (

                                    <tr>

                                        <td
                                            colSpan="6"
                                            className="text-center"
                                        >
                                            No Orders Found
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

export default SellerOrdersTable;