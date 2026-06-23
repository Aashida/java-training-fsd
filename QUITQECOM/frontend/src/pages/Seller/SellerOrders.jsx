import SellerNavbar from "../../components/Navbar-Seller";
import SellerOrdersTable from "../../components/seller/SellerOrdersTable";

const SellerOrders = () => {

    return (

        <div
            style={{
                backgroundColor: "#f8f9fa",
                minHeight: "100vh"
            }}
        >

            <SellerNavbar />

            <div className="container py-5">

                <SellerOrdersTable />

            </div>

        </div>

    );
};

export default SellerOrders;