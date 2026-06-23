import AdminLayout from "../../components/admin/AdminLayout";
import CategoriesTable from "../../components/admin/CategoriesTable";

const AdminCategories = () => {

    return (

        <AdminLayout>

            <h2 className="fw-bold mb-4">
                Category Management
            </h2>

            <CategoriesTable />

        </AdminLayout>

    );
};

export default AdminCategories;