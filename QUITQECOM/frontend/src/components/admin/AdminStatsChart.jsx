import axios from "axios";
import { useEffect, useState } from "react";

import {
    Bar,
    BarChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis
} from "recharts";

const AdminStatsChart = () => {

    const [chartData, setChartData] = useState([]);

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

            const data = [
                {
                    name: "Users",
                    count: response.data.totalUsers
                },
                {
                    name: "Customers",
                    count: response.data.totalCustomers
                },
                {
                    name: "Sellers",
                    count: response.data.totalSellers
                },
                {
                    name: "Products",
                    count: response.data.totalProducts
                },
                {
                    name: "Orders",
                    count: response.data.totalOrders
                }
            ];

            setChartData(data);

        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="card shadow border-0 mb-5">

            <div className="card-body">

                <h4 className="mb-4">
                    Platform Statistics
                </h4>

                <ResponsiveContainer
                    width="100%"
                    height={350}
                >

                    <BarChart data={chartData}>

                        <CartesianGrid strokeDasharray="3 3" />

                        <XAxis dataKey="name" />

                        <YAxis />

                        <Tooltip />

                        <Bar
                            dataKey="count"
                            fill="#0d6efd"
                        />

                    </BarChart>

                </ResponsiveContainer>

            </div>

        </div>
    );
};

export default AdminStatsChart;