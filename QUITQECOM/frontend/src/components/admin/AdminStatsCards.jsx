import axios from "axios";
import { useEffect, useState } from "react";

const AdminStatsCards = () => {

    const [stats, setStats] = useState({
        totalUsers: 0,
        totalCustomers: 0,
        totalSellers: 0,
        totalProducts: 0,
        totalOrders: 0
    });

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {

        try {

            const token = localStorage.getItem("token");

            const config = {
                headers: {
                    Authorization: "Bearer " + token
                }
            };

            const response = await axios.get(
                "http://localhost:8080/api/admin/dashboard",
                config
            );

            setStats(response.data);

        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="row g-4 mb-5">

            <div className="col-md">
                <div className="card shadow border-0 text-center">
                    <div className="card-body">
                        <h5>👥 Users</h5>
                        <h2>{stats.totalUsers}</h2>
                    </div>
                </div>
            </div>

            <div className="col-md">
                <div className="card shadow border-0 text-center">
                    <div className="card-body">
                        <h5>🙋 Customers</h5>
                        <h2>{stats.totalCustomers}</h2>
                    </div>
                </div>
            </div>

            <div className="col-md">
                <div className="card shadow border-0 text-center">
                    <div className="card-body">
                        <h5>🏪 Sellers</h5>
                        <h2>{stats.totalSellers}</h2>
                    </div>
                </div>
            </div>

            <div className="col-md">
                <div className="card shadow border-0 text-center">
                    <div className="card-body">
                        <h5>🛍 Products</h5>
                        <h2>{stats.totalProducts}</h2>
                    </div>
                </div>
            </div>

            <div className="col-md">
                <div className="card shadow border-0 text-center">
                    <div className="card-body">
                        <h5>📦 Orders</h5>
                        <h2>{stats.totalOrders}</h2>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default AdminStatsCards;