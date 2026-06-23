import axios from "axios";
import { useEffect, useState } from "react";

const OrdersTable = () => {

    const [orders, setOrders] = useState([]);

    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    const [status, setStatus] = useState("");

    const [direction, setDirection] =
        useState("desc");

    const size = 5;

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

            const response = await axios.get(

                `http://localhost:8080/api/admin/orders?page=${page}&size=${size}&sortBy=createdAt&direction=${direction}&status=${status}`,

                config
            );

           setOrders(response.data.orders);
            setTotalPages(
                response.data.totalPages
            );

        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {

        fetchOrders();

    }, [
        page,
        direction,
        status
    ]);

    return (

        <div className="card shadow border-0">

            <div className="card-body">

                <div className="row mb-4">

                    <div className="col-md-4">

                        <select
                            className="form-select"
                            value={status}
                            onChange={(e) => {

                                setPage(0);

                                setStatus(
                                    e.target.value
                                );
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

                            <option value="DELIVERED">
                                Delivered
                            </option>

                        </select>

                    </div>

                    <div className="col-md-4">

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

                            <option value="desc">
                                Newest First
                            </option>

                            <option value="asc">
                                Oldest First
                            </option>

                        </select>

                    </div>

                </div>

                <table className="table table-hover">

                    <thead className="table-dark">

                        <tr>

                            <th>Order ID</th>

                            <th>Status</th>

                            <th>Customer</th>

                            <th>Created At</th>

                        </tr>

                    </thead>

                    <tbody>

                        {
                            orders.map((order) => (

                               <tr key={order.orderId}>

    <td>
        #{order.orderId}
    </td>

    <td>

        <span
            className={
                order.status === "PLACED"
                    ? "badge bg-success"
                    : order.status === "CANCELLED"
                        ? "badge bg-danger"
                        : "badge bg-primary"
            }
        >
            {order.status}
        </span>

    </td>

    <td>
        {order.customerName}
    </td>

    <td>
        {new Date(order.createdAt)
            .toLocaleString()}
    </td>

</tr>

                            ))
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

export default OrdersTable;