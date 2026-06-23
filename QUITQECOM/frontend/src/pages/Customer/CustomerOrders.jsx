import axios from "axios";
import { Modal } from "bootstrap";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import CustomerNavbar from "../../components/Navbar-Customer";
import OrderTable from "../../components/customer/OrderTable";

const CustomerOrders = () => {

    const navigate = useNavigate();

    const [orders, setOrders] =
        useState([]);

    const [orderDetails, setOrderDetails] =
        useState(null);

    const [selectedOrderId,
        setSelectedOrderId] =
        useState(null);

    const token =
        localStorage.getItem("token");

    const config = {
        headers: {
            Authorization:
                "Bearer " + token
        }
    };

    const fetchOrders = async () => {

        try {

            const response =
                await axios.get(
                    "http://localhost:8080/api/order/my-orders",
                    config
                );

            setOrders(response.data);

        } catch (err) {

            console.log(err);

        }
    };

    const cancelOrder = async (
        orderId
    ) => {

        try {

            await axios.put(
                `http://localhost:8080/api/order/cancel/${orderId}`,
                {},
                config
            );

            fetchOrders();

        } catch (err) {

            console.log(err);

        }
    };

    const viewDetails = async (
        orderId
    ) => {

        try {

            const response =
                await axios.get(
                    `http://localhost:8080/api/order/${orderId}`,
                    config
                );

            setOrderDetails(
                response.data
            );

            setSelectedOrderId(
                orderId
            );

            const modal =
                new Modal(
                    document.getElementById(
                        "orderDetailsModal"
                    )
                );

            modal.show();

        } catch (err) {

            console.log(err);

        }
    };

    useEffect(() => {

        fetchOrders();

    }, []);

    return (

        <>

            <CustomerNavbar />

            <div className="container py-5">

                <OrderTable
                    orders={orders}
                    cancelOrder={
                        cancelOrder
                    }
                    viewDetails={
                        viewDetails
                    }
                />

            </div>

            {/* Order Details Modal */}

            <div
                className="modal fade"
                id="orderDetailsModal"
                tabIndex="-1"
            >

                <div className="modal-dialog modal-lg">

                    <div className="modal-content">

                        <div className="modal-header">

                            <h5 className="modal-title">

                                Order #
                                {
                                    orderDetails?.orderId
                                }

                            </h5>

                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                            ></button>

                        </div>

                        <div className="modal-body">

                            {
                                orderDetails && (

                                    <>

                                        <div className="row mb-4">

                                            <div className="col-md-3">

                                                <strong>
                                                    Order ID:
                                                </strong>

                                                {" "}

                                                {
                                                    orderDetails.orderId
                                                }

                                            </div>

                                            <div className="col-md-3">

                                                <strong>
                                                    Order Date:
                                                </strong>

                                                {" "}

                                                {
                                                    new Date(
                                                        orderDetails.createdAt
                                                    ).toLocaleDateString()
                                                }

                                            </div>

                                            <div className="col-md-3">

                                                <strong>
                                                    Status:
                                                </strong>

                                                {" "}

                                                <span
                                                    className={
                                                        orderDetails.status ===
                                                            "CANCELLED"

                                                            ? "badge bg-danger"

                                                            : "badge bg-success"
                                                    }
                                                >

                                                    {
                                                        orderDetails.status
                                                    }

                                                </span>

                                            </div>

                                            <div className="col-md-3">

                                                <strong>
                                                    Total:
                                                </strong>

                                                {" "}

                                                ₹
                                                {
                                                    orderDetails.totalAmount
                                                }

                                            </div>

                                        </div>

                                        <table
                                            className="table table-bordered"
                                        >

                                            <thead>

                                                <tr>

                                                    <th>
                                                        Product
                                                    </th>

                                                    <th>
                                                        Quantity
                                                    </th>

                                                    <th>
                                                        Price
                                                    </th>

                                                    <th>
                                                        Amount
                                                    </th>

                                                </tr>

                                            </thead>

                                            <tbody>

                                                {
                                                    orderDetails.items.map(
                                                        (
                                                            item,
                                                            index
                                                        ) => (

                                                            <tr
                                                                key={
                                                                    index
                                                                }
                                                            >

                                                                <td>
                                                                    {
                                                                        item.productName
                                                                    }
                                                                </td>

                                                                <td>
                                                                    {
                                                                        item.quantity
                                                                    }
                                                                </td>

                                                                <td>
                                                                    ₹
                                                                    {
                                                                        item.priceAtPurchase
                                                                    }
                                                                </td>

                                                                <td>
                                                                    ₹
                                                                    {
                                                                        item.priceAtPurchase *
                                                                        item.quantity
                                                                    }
                                                                </td>

                                                            </tr>

                                                        )
                                                    )
                                                }

                                            </tbody>

                                        </table>

                                        <div
                                            className="d-flex justify-content-between align-items-center mt-4"
                                        >

                                            <h5 className="fw-bold">

                                                Total Amount:
                                                {" "}

                                                ₹
                                                {
                                                    orderDetails.totalAmount
                                                }

                                            </h5>

                                            {
                                                orderDetails.status === "CANCELLED"

                                                    ? (

                                                        <span className="badge bg-danger fs-6">
                                                            Order Cancelled
                                                        </span>

                                                    )

                                                    : (

                                                        <button
                                                            className="btn btn-success"
                                                            onClick={() =>
                                                                navigate(
                                                                    `/customer/payment/${selectedOrderId}`
                                                                )
                                                            }
                                                        >
                                                            Make Payment
                                                        </button>

                                                    )
                                            }
                                        </div>

                                    </>

                                )
                            }

                        </div>

                    </div>

                </div>

            </div>

        </>

    );
};

export default CustomerOrders;