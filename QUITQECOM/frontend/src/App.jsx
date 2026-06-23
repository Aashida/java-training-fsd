import { Route, Routes } from "react-router-dom";

import Login from "./auth/Login";
import Home from "./pages/Home";

import CustomerRegister from "./auth/CustomerRegister";
import SellerRegister from "./auth/SellerRegister";

/* Customer */
import CustomerCart from "./pages/Customer/CustomerCart";
import CustomerDashboard from "./pages/Customer/CustomerDashboard";
import CustomerOrders from "./pages/Customer/CustomerOrders";
import CustomerProducts from "./pages/Customer/CustomerProducts";
import CustomerProfile from "./pages/Customer/CustomerProfile";
import ProductDetails from "./pages/Customer/ProductDetails";

/* Seller */
import SellerAddProduct from "./pages/Seller/SellerAddProduct";
import SellerDashboard from "./pages/Seller/SellerDashboard";
import SellerEditProduct from "./pages/Seller/SellerEditProduct";
import SellerOrders from "./pages/Seller/SellerOrders";
import SellerProducts from "./pages/Seller/SellerProducts";
import SellerProfile from "./pages/Seller/SellerProfile";
import SellerRevenue from "./pages/Seller/SellerRevenue";

/* Admin */
import AdminCategories from "./pages/Admin/AdminCategories";
import AdminCustomers from "./pages/Admin/AdminCustomers";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import AdminOrders from "./pages/Admin/AdminOrders";
import AdminProducts from "./pages/Admin/AdminProducts";


import PublicCategories from "./pages/Public/PublicCategories";
import PublicProducts from "./pages/Public/PublicProducts";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SearchProducts from "./components/SearchProducts";
import PaymentPage from "./pages/Customer/PaymentPage";

function App() {

    return (

        <>
        <Routes>

            {/* Home */}
            <Route path="/" element={<Home />} />
            <Route
    path="/search-products"
    element={<SearchProducts />}
/>

            {/* Authentication */}
            <Route path="/login" element={<Login />} />
            <Route path="/register/customer" element={<CustomerRegister />} />
            <Route path="/register/seller" element={<SellerRegister />} />

            {/* Customer */}
            <Route path="/customer" element={<CustomerDashboard />} />
            <Route path="/customer/products" element={<CustomerProducts />} />
            <Route path="/customer/product/:id" element={<ProductDetails />} />
            <Route path="/customer/cart" element={<CustomerCart />} />
            <Route path="/customer/orders" element={<CustomerOrders />} />
            <Route path="/customer/payment/:id" element={<PaymentPage/>}/>

            <Route
                path="/customer/profile"
                element={<CustomerProfile />}
            />

            {/* Seller */}
            <Route
                path="/seller"
                element={<SellerDashboard />}
            />

            <Route
                path="/seller/products"
                element={<SellerProducts />}
            />

            <Route
                path="/seller/add-product"
                element={<SellerAddProduct />}
            />

            <Route
                path="/seller/edit-product/:id"
                element={<SellerEditProduct />}
            />

            <Route
                path="/seller/orders"
                element={<SellerOrders />}
            />

            <Route
                path="/seller/revenue"
                element={<SellerRevenue />}
            />

            <Route
                path="/seller/profile"
                element={<SellerProfile />}
            />

            {/* Admin */}
            <Route
                path="/admin"
                element={<AdminDashboard />}
            />

            <Route
                path="/admin/products"
                element={<AdminProducts />}
            />

            <Route
                path="/admin/orders"
                element={<AdminOrders />}
            />

            <Route
                path="/admin/customers"
                element={<AdminCustomers />}
            />

            <Route
                path="/admin/categories"
                element={<AdminCategories />}
            />


            <Route
    path="/categories"
    element={<PublicCategories />}
/>

<Route
    path="/products"
    element={<PublicProducts />}
/>

        </Routes>

        
<ToastContainer />
</>


    

    );
}

export default App;