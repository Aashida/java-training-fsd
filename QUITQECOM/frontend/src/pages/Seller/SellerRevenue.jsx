import SellerNavbar from "../../components/Navbar-Seller";
import SellerMonthlyRevenueCard from "../../components/seller/SellerMonthlyRevenueCard";
import SellerMonthlyRevenueChart from "../../components/seller/SellerMonthlyRevenueChart";
import SellerQuarterlyRevenueChart from "../../components/seller/SellerQuarterlyRevenueChart";
import SellerRevenueCard from "../../components/seller/SellerRevenueCard";
import SellerRevenueSummaryCard from "../../components/seller/SellerRevenueSummaryCard";
import SellerStatusSummaryCard from "../../components/seller/SellerStatusSummaryCard";
import SellerTopProductsTable from "../../components/seller/SellerTopProductsTable";



const SellerRevenue = () => {

    return (

        <div
            style={{
                backgroundColor: "#f8f9fa",
                minHeight: "100vh"
            }}
        >

            <SellerNavbar />

            <div className="container py-5">

                <h2 className="fw-bold mb-4">
                    Revenue Dashboard
                </h2>

                <SellerRevenueCard />
                <br></br>
                <SellerRevenueSummaryCard />
                <SellerStatusSummaryCard />
                <SellerMonthlyRevenueCard/>
                <br></br>
                <SellerMonthlyRevenueChart/>
                <br></br>
                <SellerQuarterlyRevenueChart/>
                
                <SellerTopProductsTable />

                

            </div>

        </div>

    );
};

export default SellerRevenue;