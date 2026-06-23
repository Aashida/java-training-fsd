import AdminLayout from "../../components/admin/AdminLayout";
import ProductsTable from "../../components/admin/ProductsTable";

const AdminProducts = () => {

    return (

        <AdminLayout>

            <h2 className="fw-bold mb-4">
                Product Management
            </h2>

            <ProductsTable />

        </AdminLayout>

    );
};

export default AdminProducts;