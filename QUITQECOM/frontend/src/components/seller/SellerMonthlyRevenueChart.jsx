import axios from "axios";
import { useEffect, useState } from "react";

import {
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip
} from "chart.js";

import { Line } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const SellerMonthlyRevenueChart = () => {

    const [chartData, setChartData] =
        useState(null);

    const config = {
        headers: {
            Authorization:
                "Bearer " +
                localStorage.getItem("token")
        }
    };

    useEffect(() => {

        const fetchData = async () => {

            try {

                const response =
                    await axios.get(
                        "http://localhost:8080/api/seller/monthly-revenue-chart",
                        config
                    );

                const currentMonth =
                    new Date().getMonth() + 1;

                const monthNames = [
                    "Jan",
                    "Feb",
                    "Mar",
                    "Apr",
                    "May",
                    "Jun",
                    "Jul",
                    "Aug",
                    "Sep",
                    "Oct",
                    "Nov",
                    "Dec"
                ];

                const labels =
                    monthNames.slice(
                        0,
                        currentMonth
                    );

                const revenueData =
                    new Array(currentMonth)
                        .fill(0);

                response.data.forEach(item => {

                    revenueData[
                        item.month - 1
                    ] = item.revenue;

                });

                setChartData({

                    labels,

                    datasets: [
                        {
                            label:
                                "Revenue",

                            data:
                                revenueData,

                            borderColor:
                                "#0d6efd",

                            backgroundColor:
                                "#0d6efd",

                            tension:
                                0.3
                        }
                    ]
                });

            } catch (err) {

                console.log(err);

            }
        };

        fetchData();

    }, []);

    return (

        <div className="card border-0 shadow-sm mt-4">

            <div className="card-body">

                <h5 className="mb-3">
                    Monthly Revenue Trend
                </h5>

                {
                    chartData &&
                    <Line data={chartData} />
                }

            </div>

        </div>

    );
};

export default SellerMonthlyRevenueChart;