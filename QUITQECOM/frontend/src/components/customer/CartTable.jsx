const CartTable = ({
    cartItems,
    removeItem,
    clearCart
}) => {

    const totalAmount =
        cartItems.reduce(
            (sum, item) =>
                sum +
                (item.price * item.quantity),
            0
        );

    return (

        <div className="card shadow border-0">

            <div className="card-body">

                <div className="d-flex justify-content-between mb-3">

                    <h4 className="fw-bold">
                        My Cart
                    </h4>

                    <button
                        className="btn btn-danger btn-sm"
                        onClick={clearCart}
                    >
                        Clear Cart
                    </button>

                </div>

                <table className="table">

                    <thead>

                        <tr>

                            <th>Product</th>

                            <th>Quantity</th>

                            <th>Price</th>

                            <th>Total</th>

                            <th>Action</th>

                        </tr>

                    </thead>

                    <tbody>

                        {
                            cartItems.map(
                                (item) => (

                                    <tr
                                        key={
                                            item.cartItemId
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
                                            ₹{item.price}
                                        </td>

                                        <td>
                                            ₹{
                                                item.price *
                                                item.quantity
                                            }
                                        </td>

                                        <td>

                                            <button
                                                className="btn btn-danger btn-sm"
                                                onClick={() =>
                                                    removeItem(
                                                        item.cartItemId
                                                    )
                                                }
                                            >
                                                Remove
                                            </button>

                                        </td>

                                    </tr>

                                )
                            )
                        }

                    </tbody>

                </table>

                <div className="text-end">

                    <h4 className="fw-bold">

                        Total :

                        <span
                            className="text-success"
                        >
                            {" "}
                            ₹{totalAmount}
                        </span>

                    </h4>

                </div>

            </div>

        </div>

    );
};

export default CartTable;