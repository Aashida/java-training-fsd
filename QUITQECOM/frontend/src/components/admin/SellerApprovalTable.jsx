import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const SellerApprovalTable = () => {

    const [sellers, setSellers] = useState([]);

    const [statusFilter, setStatusFilter] = useState("ALL");

    const [currentPage, setCurrentPage] = useState(1);

    const recordsPerPage = 5;

    const sellersApi =
        "http://localhost:8080/api/admin/sellers";

    const approveApi =
        "http://localhost:8080/api/admin/approve-seller/";

    const fetchSellers = async () => {

        try {

            const token = localStorage.getItem("token");

            const config = {
                headers: {
                    Authorization: "Bearer " + token
                }
            };

            const response =
                await axios.get(sellersApi, config);

            setSellers(response.data);

        } catch (err) {
            console.log(err);
        }
    };

    const approveSeller = async (sellerId) => {

        try {

            const token = localStorage.getItem("token");

            const config = {
                headers: {
                    Authorization: "Bearer " + token
                }
            };

            await axios.put(
                approveApi + sellerId,
                {},
                config
            );

            toast.success("Seller Approved");

            fetchSellers();

        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchSellers();
    }, []);

    // Filter Logic
    const filteredSellers = sellers.filter((seller) => {

        if (statusFilter === "APPROVED") {
            return seller.user.isActive;
        }

        if (statusFilter === "PENDING") {
            return !seller.user.isActive;
        }

        return true;
    });

    // Pagination Logic
    const lastIndex = currentPage * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;

    const currentSellers =
        filteredSellers.slice(firstIndex, lastIndex);

    const totalPages =
        Math.ceil(filteredSellers.length / recordsPerPage);

    return (
        <div className="card shadow border-0">

            <div className="card-body">

                <div className="d-flex justify-content-between align-items-center mb-4">

                    <h4 className="fw-bold mb-0">
                        Seller Approvals
                    </h4>

                    <span className="badge bg-primary fs-6">
                        {filteredSellers.length} Sellers
                    </span>

                </div>

                {/* Filter Dropdown */}
                <div className="row mb-3">

                    <div className="col-md-3">

                        <select
                            className="form-select"
                            value={statusFilter}
                            onChange={(e) => {
                                setStatusFilter(e.target.value);
                                setCurrentPage(1);
                            }}
                        >
                            <option value="ALL">
                                All Sellers
                            </option>

                            <option value="APPROVED">
                                Approved
                            </option>

                            <option value="PENDING">
                                Pending
                            </option>

                        </select>

                    </div>

                </div>

                <div className="table-responsive">

                    <table className="table table-hover align-middle">

                        <thead className="table-dark">

                            <tr>
                                <th>ID</th>
                                <th>Shop Name</th>
                                <th>Username</th>
                                <th>Email</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>

                        </thead>

                        <tbody>

                            {
                                currentSellers.length > 0 ?

                                    currentSellers.map((seller) => (

                                        <tr key={seller.id}>

                                            <td>{seller.id}</td>

                                            <td>
                                                <strong>
                                                    {seller.shopName}
                                                </strong>
                                            </td>

                                            <td>
                                                {seller.user.username}
                                            </td>

                                            <td>
                                                {seller.user.email}
                                            </td>

                                            <td>

                                                {
                                                    seller.user.isActive ?

                                                        <span className="badge bg-success">
                                                            Approved
                                                        </span>

                                                        :

                                                        <span className="badge bg-warning text-dark">
                                                            Pending
                                                        </span>
                                                }

                                            </td>

                                            <td>

                                                {
                                                    !seller.user.isActive ?

                                                        <button
                                                            className="btn btn-success btn-sm"
                                                            onClick={() =>
                                                                approveSeller(
                                                                    seller.id
                                                                )
                                                            }
                                                        >
                                                            Approve
                                                        </button>

                                                        :

                                                        <button
                                                            className="btn btn-secondary btn-sm"
                                                            disabled
                                                        >
                                                            Approved
                                                        </button>
                                                }

                                            </td>

                                        </tr>

                                    ))

                                    :

                                    <tr>
                                        <td
                                            colSpan="6"
                                            className="text-center"
                                        >
                                            No Sellers Found
                                        </td>
                                    </tr>
                            }

                        </tbody>

                    </table>

                </div>

                {/* Pagination */}

                {
                    totalPages > 0 && (

                        <div className="d-flex justify-content-center align-items-center mt-3">

                            <button
                                className="btn btn-outline-primary me-2"
                                disabled={currentPage === 1}
                                onClick={() =>
                                    setCurrentPage(currentPage - 1)
                                }
                            >
                                Previous
                            </button>

                            {
                                [...Array(totalPages)].map((_, index) => (

                                    <button
                                        key={index}
                                        className={`btn mx-1 ${
                                            currentPage === index + 1
                                                ? "btn-primary"
                                                : "btn-outline-primary"
                                        }`}
                                        onClick={() =>
                                            setCurrentPage(index + 1)
                                        }
                                    >
                                        {index + 1}
                                    </button>

                                ))
                            }

                            <button
                                className="btn btn-outline-primary ms-2"
                                disabled={currentPage === totalPages}
                                onClick={() =>
                                    setCurrentPage(currentPage + 1)
                                }
                            >
                                Next
                            </button>

                        </div>

                    )
                }

            </div>

        </div>
    );
};

export default SellerApprovalTable;