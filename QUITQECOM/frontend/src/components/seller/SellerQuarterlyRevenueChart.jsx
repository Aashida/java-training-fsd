import axios from "axios";
import { useEffect, useState } from "react";

import {
    BarElement,
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    Title,
    Tooltip
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const SellerQuarterlyRevenueChart = () => {

    const [chartData,
        setChartData] =
        useState(null);

    const config = {
        headers: {
            Authorization:
                "Bearer " +
                localStorage.getItem("token")
        }
    };

    useEffect(() => {

        const fetchData =
            async () => {

                try {

                    const response =
                        await axios.get(
                            "http://localhost:8080/api/seller/monthly-revenue-chart",
                            config
                        );

                    let q1 = 0;
                    let q2 = 0;
                    let q3 = 0;
                    let q4 = 0;

                    response.data.forEach(
                        item => {

                            if (
                                item.month <= 3
                            ) {

                                q1 +=
                                    item.revenue;

                            }

                            else if (
                                item.month <= 6
                            ) {

                                q2 +=
                                    item.revenue;

                            }

                            else if (
                                item.month <= 9
                            ) {

                                q3 +=
                                    item.revenue;

                            }

                            else {

                                q4 +=
                                    item.revenue;

                            }
                        }
                    );

                    const currentQuarter =
                        Math.ceil(
                            (
                                new Date()
                                    .getMonth()
                                + 1
                            ) / 3
                        );

                    const labels = [];

                    const values = [];

                    if (
                        currentQuarter >= 1
                    ) {

                        labels.push(
                            "Q1"
                        );

                        values.push(
                            q1
                        );
                    }

                    if (
                        currentQuarter >= 2
                    ) {

                        labels.push(
                            "Q2"
                        );

                        values.push(
                            q2
                        );
                    }

                    if (
                        currentQuarter >= 3
                    ) {

                        labels.push(
                            "Q3"
                        );

                        values.push(
                            q3
                        );
                    }

                    if (
                        currentQuarter >= 4
                    ) {

                        labels.push(
                            "Q4"
                        );

                        values.push(
                            q4
                        );
                    }

                    setChartData({

                        labels,

                        datasets: [
                            {
                                label:
                                    "Revenue",

                                data:
                                    values,

                                backgroundColor:
                                    "#198754"
                            }
                        ]
                    });

                } catch (err) {

                    console.log(
                        err
                    );

                }
            };

        fetchData();

    }, []);

    return (

        <div className="card border-0 shadow-sm">

            <div className="card-body">

                <h5 className="mb-3">
                    Quarterly Revenue
                </h5>

                {
                    chartData &&
                    <Bar
                        data={
                            chartData
                        }
                    />
                }

            </div>

        </div>

    );
};

export default SellerQuarterlyRevenueChart;