import AdminSidebar from "./AdminSidebar";

const AdminLayout = ({ children }) => {

    return (

        <div className="d-flex">

            <AdminSidebar />

            <div
                className="flex-grow-1 p-4"
                style={{
                    backgroundColor: "#f8f9fa",
                    minHeight: "100vh"
                }}
            >
                {children}
            </div>

        </div>

    );
};

export default AdminLayout;