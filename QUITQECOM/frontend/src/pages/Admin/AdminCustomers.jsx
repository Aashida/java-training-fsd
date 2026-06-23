import AdminLayout from "../../components/admin/AdminLayout";
import CustomersTable from "../../components/admin/CustomersTable";

const AdminCustomers = () => {

    return (

        <AdminLayout>

            <h2 className="fw-bold mb-4">
                Customer Management
            </h2>

            <CustomersTable />

        </AdminLayout>

    );
};

export default AdminCustomers;