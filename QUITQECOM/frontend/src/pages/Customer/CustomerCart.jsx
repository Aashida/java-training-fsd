import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";
import CustomerNavbar from "../../components/Navbar-Customer";
import CartTable from "../../components/customer/CartTable";

const CustomerCart = () => {

    const [cartItems, setCartItems] =
        useState([]);

    const navigate = useNavigate();

    const token =
        localStorage.getItem("token");

    const config = {
        headers: {
            Authorization:
                "Bearer " + token
        }
    };

    const fetchCart = async () => {

        try {

            const response =
                await axios.get(
                    "http://localhost:8080/api/cart",
                    config
                );

            setCartItems(response.data);

        } catch (err) {

            console.log(err);

        }
    };

    const removeItem = async (
        cartItemId
    ) => {

        try {

            await axios.delete(
                `http://localhost:8080/api/cart/remove/${cartItemId}`,
                config
            );

            fetchCart();

        } catch (err) {

            console.log(err);

        }
    };

    const clearCart = async () => {

        try {

            await axios.delete(
                "http://localhost:8080/api/cart/clear",
                config
            );

            fetchCart();

        } catch (err) {

            console.log(err);

        }
    };

    const placeOrder = async () => {

        try {

            await axios.post(
                "http://localhost:8080/api/order/place",
                {},
                config
            );

            toast.success("Placed order successfully!")

            navigate("/customer/orders");

        } catch (err) {

            console.log(err);

            toast.warning("Unable to place order");

        }
    };

    useEffect(() => {

        fetchCart();

    }, []);

    return (

        <>
            <CustomerNavbar />

            <div className="container py-5">

                <CartTable
                    cartItems={cartItems}
                    removeItem={removeItem}
                    clearCart={clearCart}
                />

                <div className="d-flex justify-content-end mt-4">

                    <button
                        className="btn btn-success btn-lg"
                        onClick={placeOrder}
                    >
                        Place Order
                    </button>

                </div>

            </div>

        </>
    );
};

export default CustomerCart;