import AdminLayout from "../../components/admin/AdminLayout";
import OrdersTable from "../../components/admin/OrdersTable";

const AdminOrders = () => {

    return (

        <AdminLayout>

            <h2 className="fw-bold mb-4">
                Order Management
            </h2>

            <OrdersTable />

        </AdminLayout>

    );
};

export default AdminOrders;