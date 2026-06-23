import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { toast } from "react-toastify";

import CustomerNavbar from "../../components/Navbar-Customer";

const PaymentPage = () => {

    const { id } = useParams();

    const navigate = useNavigate();

    const [payment, setPayment] =
        useState(null);

    const [loading, setLoading] =
        useState(false);

    const token =
        localStorage.getItem("token");

    const config = {
        headers: {
            Authorization:
                "Bearer " + token
        }
    };

    const makePayment = async () => {

        try {

            setLoading(true);

            const response =
                await axios.post(

                    `http://localhost:8080/api/payment/pay/${id}`,

                    {
                        paymentMethod: "COD"
                    },

                    config

                );

            setPayment(response.data);

            toast.success(
                "Order confirmed successfully!"
            );

        }
        catch (err) {

            console.log(err);

            toast.warning(
                err.response?.data ||
                "Payment failed"
            );

        }
        finally {

            setLoading(false);

        }

    };

    const fetchPayment =
        async () => {

            try {

                const response =
                    await axios.get(

                        `http://localhost:8080/api/payment/${id}`,

                        config

                    );

                setPayment(
                    response.data
                );

            }
            catch {

            }

        };

    useEffect(() => {

        fetchPayment();

    }, []);

    return (

        <>

            <CustomerNavbar />

            <div className="container py-5">

                <div
                    className="card shadow border-0 mx-auto"
                    style={{
                        maxWidth: "700px"
                    }}
                >

                    <div className="card-body p-4">

                        <h2
                            className="fw-bold mb-4"
                        >
                            Payment Summary
                        </h2>

                        <div
                            className="mb-4"
                        >

                            <p>

                                <strong>
                                    Order ID:
                                </strong>

                                {" "}

                                {id}

                            </p>

                            <p>

                                <strong>
                                    Payment Method:
                                </strong>

                                {" "}

                                Cash On Delivery

                            </p>

                        </div>

                        {
                            payment ? (

                                <>

                                    <div
                                        className="alert alert-success"
                                    >

                                        Payment Recorded
                                        Successfully

                                    </div>

                                    <p>

                                        <strong>
                                            Transaction ID:
                                        </strong>

                                        {" "}

                                        {
                                            payment.transactionId
                                        }

                                    </p>

                                    <p>

                                        <strong>
                                            Amount:
                                        </strong>

                                        {" "}

                                        ₹
                                        {
                                            payment.amount
                                        }

                                    </p>

                                    <p>

                                        <strong>
                                            Status:
                                        </strong>

                                        {" "}

                                        {
                                            payment.paymentStatus
                                        }

                                    </p>

                                    <button

                                        className="btn btn-dark"

                                        onClick={() =>
                                            navigate(
                                                "/customer/orders"
                                            )
                                        }

                                    >
                                        Back To Orders
                                    </button>

                                </>

                            ) : (

                                <>

                                    <div
                                        className="alert alert-warning"
                                    >

                                        Cash On Delivery
                                        selected.

                                        Click confirm
                                        to place your
                                        order.

                                    </div>

                                    <button

                                        className="btn btn-success"

                                        disabled={
                                            loading
                                        }

                                        onClick={
                                            makePayment
                                        }

                                    >

                                        {
                                            loading

                                                ? "Processing..."

                                                : "Confirm Order"
                                        }

                                    </button>

                                </>

                            )
                        }

                    </div>

                </div>

            </div>

        </>

    );

};

export default PaymentPage;