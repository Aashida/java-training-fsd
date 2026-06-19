import axios from "axios";
import { useEffect, useState } from "react";

import { FaTrash } from "react-icons/fa";

function UserList() {

    const [users, setUsers] = useState([]);

    const fetchUsers = async () => {

        try {

            const response = await axios.get(
                "https://jsonplaceholder.typicode.com/users"
            );

            setUsers(response.data);

        }
        catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const deleteUser = async (id) => {

        try {

            await axios.delete(
                `https://jsonplaceholder.typicode.com/users/${id}`
            );

            setUsers(
                users.filter((user) => user.id !== id)
            );

            alert("User Deleted");

        }
        catch (error) {
            console.log(error);
        }
    };

    return (

        <div>

            <h2>User List</h2>

            <table class="table table-striped">

                <thead>

                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Company</th>
                        <th>Action</th>
                    </tr>

                </thead>

                <tbody>

                    {
                        users.map((user) => (

                            <tr key={user.id}>

                                <td>{user.name}</td>

                                <td>{user.email}</td>

                                <td>{user.phone}</td>

                                <td>{user.company.name}</td>

                                <td>

                                    <button
                                        className="btn btn-danger"
                                        onClick={() => deleteUser(user.id)}
                                    >
                                        <FaTrash />
                                    </button>

                                </td>

                            </tr>

                        ))
                    }

                </tbody>

            </table>

        </div>
    );
}

export default UserList;