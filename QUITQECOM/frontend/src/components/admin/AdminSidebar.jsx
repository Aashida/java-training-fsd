import { Link, useLocation } from "react-router-dom";

const AdminSidebar = () => {

    const location = useLocation();

    const menuItems = [
        {
            name: "Dashboard",
            path: "/admin",
            icon: "📊"
        },
        {
            name: "Products",
            path: "/admin/products",
            icon: "🛍"
        },
        {
            name: "Orders",
            path: "/admin/orders",
            icon: "📦"
        },
        {
            name: "Customers",
            path: "/admin/customers",
            icon: "👥"
        },
        {
            name: "Categories",
            path: "/admin/categories",
            icon: "📂"
        }
    ];

    const logout = () => {

        localStorage.removeItem("token");

        window.location.href = "/login";
    };

    return (

        <div
            className="bg-dark text-white p-4"
            style={{
                width: "260px",
                minHeight: "100vh"
            }}
        >

            <h3 className="mb-5 fw-bold">
                QuitQ Admin
            </h3>

            {
                menuItems.map((item) => (

                    <Link
                        key={item.path}
                        to={item.path}
                        className={`d-block text-decoration-none p-3 rounded mb-2 ${
                            location.pathname === item.path
                                ? "bg-primary text-white"
                                : "text-light"
                        }`}
                    >

                        {item.icon} {item.name}

                    </Link>

                ))
            }

            <button
                className="btn btn-danger mt-4 w-100"
                onClick={logout}
            >
                Logout
            </button>

        </div>
    );
};

export default AdminSidebar;