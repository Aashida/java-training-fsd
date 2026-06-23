import axios from "axios";
import { useEffect, useState } from "react";

const SellerRevenueSummaryCard = () => {

    const [revenue, setRevenue] = useState(0);
    const [productsSold, setProductsSold] = useState(0);

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

                const revenueResp =
                    await axios.get(
                        "http://localhost:8080/api/seller/revenue",
                        config
                    );

                const soldResp =
                    await axios.get(
                        "http://localhost:8080/api/seller/products-sold",
                        config
                    );

                setRevenue(
                    revenueResp.data.totalRevenue
                );

                setProductsSold(
                    soldResp.data
                );

            } catch(err) {

                console.log(err);

            }
        };

        fetchData();

    }, []);

    return (

        <div className="row g-4 mb-4">

            <div className="col-md-6">

                <div className="card shadow-sm border-0">

                    <div className="card-body text-center">

                        <h5>Total Revenue</h5>

                        <h1>
                            ₹{revenue}
                        </h1>

                    </div>

                </div>

            </div>

            <div className="col-md-6">

                <div className="card shadow-sm border-0">

                    <div className="card-body text-center">

                        <h5>Products Sold</h5>

                        <h1>
                            {productsSold}
                        </h1>

                    </div>

                </div>

            </div>

        </div>

    );
};

export default SellerRevenueSummaryCard;