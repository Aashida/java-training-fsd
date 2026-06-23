import SellerNavbar from "../../components/Navbar-Seller";
import SellerProductsTable from "../../components/seller/SellerProductsTable";

const SellerProducts = () => {

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
                    My Products
                </h2>

                <SellerProductsTable />

            </div>

        </div>

    );
};

export default SellerProducts;