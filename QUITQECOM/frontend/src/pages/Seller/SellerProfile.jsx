import SellerNavbar from "../../components/Navbar-Seller";
import SellerProfileForm from "../../components/seller/SellerProfileForm";

const SellerProfile = () => {

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
                    Seller Profile
                </h2>

                <SellerProfileForm />

            </div>

        </div>

    );
};

export default SellerProfile;