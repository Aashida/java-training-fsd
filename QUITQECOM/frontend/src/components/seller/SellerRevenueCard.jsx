import axios from "axios";
import { useEffect, useState } from "react";

const SellerRevenueCard = () => {

    const [revenue, setRevenue] = useState(0);

    const fetchRevenue = async () => {

        try {

            const token = localStorage.getItem("token");

            const config = {
                headers: {
                    Authorization: "Bearer " + token
                }
            };

            const response = await axios.get(
                "http://localhost:8080/api/seller/revenue",
                config
            );

            setRevenue(response.data.totalRevenue);

        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchRevenue();
    }, []);

    return (

        <div
            className="card border-0 shadow-sm"
            style={{
                borderRadius: "20px"
            }}
        >

            <div className="card-body text-center py-5">

                <h5 className="text-muted">
                    Total Revenue
                </h5>

                <h1
                    className="fw-bold mt-3"
                    style={{
                        fontSize: "3rem"
                    }}
                >
                    ₹ {revenue}
                </h1>

                <p className="text-success mt-3">
                    Revenue generated from all orders
                </p>

            </div>

        </div>

    );
};

export default SellerRevenueCard;