import axios from "axios";
import { useEffect, useState } from "react";

const SellerTopProductsTable = () => {

    const [products, setProducts] =
        useState([]);

    const config = {
        headers: {
            Authorization:
                "Bearer " +
                localStorage.getItem("token")
        }
    };

    useEffect(() => {

        const fetchProducts =
            async () => {

                try {

                    const response =
                        await axios.get(
                            "http://localhost:8080/api/seller/top-products",
                            config
                        );

                    setProducts(
                        response.data
                    );

                } catch(err) {

                    console.log(err);

                }
            };

        fetchProducts();

    }, []);

    return (

        <div className="card shadow-sm border-0">

            <div className="card-body">

                <h4>
                    Top Selling Products
                </h4>

                <table className="table mt-3">

                    <thead>

                    <tr>

                        <th>
                            Product
                        </th>

                        <th>
                            Quantity Sold
                        </th>

                    </tr>

                    </thead>

                    <tbody>

                    {
                        products.map(
                            (product,index) => (

                                <tr key={index}>

                                    <td>
                                        {product.productName}
                                    </td>

                                    <td>
                                        {product.quantitySold}
                                    </td>

                                </tr>

                            )
                        )
                    }

                    </tbody>

                </table>

            </div>

        </div>

    );
};

export default SellerTopProductsTable;