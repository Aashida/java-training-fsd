import { useState } from "react";

const OrderTable = ({
    orders,
    cancelOrder,
    viewDetails
}) => {

    const [currentPage, setCurrentPage] =
        useState(1);

    const ordersPerPage = 5;

    const lastIndex =
        currentPage * ordersPerPage;

    const firstIndex =
        lastIndex - ordersPerPage;

    const currentOrders =
        orders.slice(
            firstIndex,
            lastIndex
        );

    const totalPages =
        Math.ceil(
            orders.length /
            ordersPerPage
        );

    return (

        <div className="card shadow border-0">

            <div className="card-body">

                <h4 className="fw-bold mb-4">
                    My Orders
                </h4>

                <table className="table">

                    <thead>

                        <tr>

                            <th>Order ID</th>

                            <th>Product Name</th>

                            <th>Status</th>

                            <th>Actions</th>

                        </tr>

                    </thead>

                    <tbody>

                        {
                            currentOrders.map(
                                (order) => (

                                    <tr
                                        key={
                                            order.orderId
                                        }
                                    >

                                        <td>
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

                                            <span
                                                className="badge bg-success"
                                            >
                                                {
                                                    order.status
                                                }
                                            </span>

                                        </td>

                                        <td>

                                            <button
                                                className="btn btn-dark btn-sm me-2"
                                                onClick={() =>
                                                    viewDetails(
                                                        order.orderId
                                                    )
                                                }
                                            >
                                                Details
                                            </button>

                                            <button
                                                className="btn btn-danger btn-sm"
                                                onClick={() =>
                                                    cancelOrder(
                                                        order.orderId
                                                    )
                                                }
                                            >
                                                Cancel
                                            </button>

                                        </td>

                                    </tr>

                                )
                            )
                        }

                    </tbody>

                </table>

                {
                    totalPages > 1 && (

                        <div
                            className="d-flex justify-content-center mt-4 gap-2"
                        >

                            <button
                                className="btn btn-outline-dark"
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
                                className="btn btn-dark"
                            >
                                {currentPage}
                            </button>

                            <button
                                className="btn btn-outline-dark"
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

export default OrderTable;