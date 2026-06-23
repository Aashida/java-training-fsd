import axios from "axios";
import { useEffect, useState } from "react";

const SellerStatusSummaryCard = () => {

    const [summary, setSummary] =
        useState({});

    const config = {
        headers: {
            Authorization:
                "Bearer " +
                localStorage.getItem("token")
        }
    };

    useEffect(() => {

        const fetchSummary =
            async () => {

                try {

                    const response =
                        await axios.get(
                            "http://localhost:8080/api/seller/status-summary",
                            config
                        );

                    setSummary(
                        response.data
                    );

                } catch(err) {

                    console.log(err);

                }
            };

        fetchSummary();

    }, []);

    return (

       <div className="row g-4 mb-4">
        <h2>Order Status</h2>

    <div className="col-md-6">
        <div className="card border-0 shadow-sm">
            <div className="card-body text-center py-4">
                <h6 className="text-muted">
                    Placed Orders
                </h6>

                <h1 className="text-success fw-bold">
                    {summary.placedOrders}
                </h1>
            </div>
        </div>
    </div>

    <div className="col-md-6">
        <div className="card border-0 shadow-sm">
            <div className="card-body text-center py-4">
                <h6 className="text-muted">
                    Cancelled Orders
                </h6>

                <h1 className="text-danger fw-bold">
                    {summary.cancelledOrders}
                </h1>
            </div>
        </div>
    </div>

</div>

    );
};

export default SellerStatusSummaryCard;