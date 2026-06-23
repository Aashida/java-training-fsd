import axios from "axios";
import { useEffect, useState } from "react";

const CustomersTable = () => {

    const [customers, setCustomers] = useState([]);

    const [page, setPage] = useState(0);

    const [totalPages, setTotalPages] =
        useState(0);

    const [search, setSearch] =
        useState("");

    const size = 5;

    const fetchCustomers = async () => {

        try {

            const token =
                localStorage.getItem("token");

            const config = {

                headers: {

                    Authorization:
                        "Bearer " + token

                }

            };

            const response =
                await axios.get(

                    `http://localhost:8080/api/admin/customers?page=${page}&size=${size}&search=${search}`,

                    config

                );

            setCustomers(
                response.data.customers
            );

            setTotalPages(
                response.data.totalPages
            );

        } catch (err) {

            console.log(err);

        }
    };

    useEffect(() => {

        fetchCustomers();

    }, [page, search]);

    return (

        <div className="card shadow border-0">

            <div className="card-body">

                <div className="row mb-4">

                    <div className="col-md-6">

                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search by name, email or username"
                            value={search}
                            onChange={(e) => {

                                setPage(0);

                                setSearch(
                                    e.target.value
                                );
                            }}
                        />

                    </div>

                </div>

                <table className="table table-hover">

                    <thead className="table-dark">

                        <tr>

                            <th>ID</th>

                            <th>Name</th>

                            <th>Email</th>

                            <th>Username</th>

                        </tr>

                    </thead>

                    <tbody>

                        {
                            customers.map(

                                (customer) => (

                                    <tr
                                        key={
                                            customer.customerId
                                        }
                                    >

                                        <td>
                                            {
                                                customer.customerId
                                            }
                                        </td>

                                        <td>
                                            {
                                                customer.fullName
                                            }
                                        </td>

                                        <td>
                                            {
                                                customer.email
                                            }
                                        </td>

                                        <td>
                                            {
                                                customer.username
                                            }
                                        </td>

                                    </tr>

                                )

                            )
                        }

                    </tbody>

                </table>

                <div
                    className="
                        d-flex
                        justify-content-center
                        align-items-center
                        mt-4
                    "
                >

                    <button
                        className="
                            btn
                            btn-secondary
                            me-3
                        "
                        disabled={
                            page === 0
                        }
                        onClick={() =>
                            setPage(
                                page - 1
                            )
                        }
                    >
                        Previous
                    </button>

                    <span>

                        Page

                        {" "}

                        {
                            page + 1
                        }

                        {" "}of{" "}

                        {
                            totalPages
                        }

                    </span>

                    <button
                        className="
                            btn
                            btn-secondary
                            ms-3
                        "
                        disabled={
                            page ===
                            totalPages - 1
                        }
                        onClick={() =>
                            setPage(
                                page + 1
                            )
                        }
                    >
                        Next
                    </button>

                </div>

            </div>

        </div>

    );
};

export default CustomersTable;