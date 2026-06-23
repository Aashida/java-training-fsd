import AdminLayout from "../../components/admin/AdminLayout";

import AdminStatsCards from "../../components/admin/AdminStatsCards";
import AdminStatsChart from "../../components/admin/AdminStatsChart";
import SellerApprovalTable from "../../components/admin/SellerApprovalTable";

const AdminDashboard = () => {

    return (

        <AdminLayout>

            <h2 className="fw-bold mb-4">
                Admin Dashboard
            </h2>

            <AdminStatsCards />

            <AdminStatsChart />

            <SellerApprovalTable />

        </AdminLayout>

    );
};

export default AdminDashboard;