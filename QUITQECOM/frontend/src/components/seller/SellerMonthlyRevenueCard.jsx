import axios from "axios";
import { useEffect, useState } from "react";

const SellerMonthlyRevenueCard = () => {

    const [revenue, setRevenue] =
        useState(0);

    const config = {
        headers: {
            Authorization:
                "Bearer " +
                localStorage.getItem("token")
        }
    };

    useEffect(() => {

        const fetchRevenue =
            async () => {

                try {

                    const response =
                        await axios.get(
                            "http://localhost:8080/api/seller/monthly-revenue",
                            config
                        );

                    setRevenue(
                        response.data
                    );

                } catch(err) {

                    console.log(err);

                }
            };

        fetchRevenue();

    }, []);

    return (

        <div className="card border-0 shadow-sm h-100">

            <div className="card-body text-center">

                <h5 className="text-muted">
                    This Month Revenue
                </h5>

                <h1 className="fw-bold text-success">
                    ₹{revenue}
                </h1>

            </div>

        </div>

    );
};

export default SellerMonthlyRevenueCard;