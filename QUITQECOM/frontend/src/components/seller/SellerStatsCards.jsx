import axios from "axios";
import { useEffect, useState } from "react";

const SellerStatsCards = () => {

    const [stats, setStats] = useState({
        totalProducts: 0,
        totalOrders: 0,
        totalRevenue: 0
    });

    const fetchStats = async () => {

        try {

            const token = localStorage.getItem("token");

            const config = {
                headers: {
                    Authorization: "Bearer " + token
                }
            };

            const response = await axios.get(
                "http://localhost:8080/api/seller/dashboard",
                config
            );

            setStats(response.data);

        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchStats();
    }, []);

    return (

        <div className="row g-4 mt-2">

            <div className="col-md-4">

                <div
                    className="card border-0 shadow-sm h-100"
                    style={{
                        borderRadius: "20px"
                    }}
                >

                    <div className="card-body text-center py-4">

                        <h5>🛍 Products</h5>

                        <h2 className="fw-bold mt-3">
                            {stats.totalProducts}
                        </h2>

                    </div>

                </div>

            </div>

            <div className="col-md-4">

                <div
                    className="card border-0 shadow-sm h-100"
                    style={{
                        borderRadius: "20px"
                    }}
                >

                    <div className="card-body text-center py-4">

                        <h5>📦 Orders</h5>

                        <h2 className="fw-bold mt-3">
                            {stats.totalOrders}
                        </h2>

                    </div>

                </div>

            </div>

            <div className="col-md-4">

                <div
                    className="card border-0 shadow-sm h-100"
                    style={{
                        borderRadius: "20px"
                    }}
                >

                    <div className="card-body text-center py-4">

                        <h5>💰 Revenue</h5>

                        <h2 className="fw-bold mt-3">
                            ₹ {stats.totalRevenue}
                        </h2>

                    </div>

                </div>

            </div>

        </div>

    );
};

export default SellerStatsCards;