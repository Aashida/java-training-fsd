import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddUser() {

    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [company, setCompany] = useState("");

    const [success, setSuccess] = useState("");

    const addUser = async (e) => {

        e.preventDefault();

        try {

            const response = await axios.post(
                "https://jsonplaceholder.typicode.com/users",
                {
                    name: name,
                    email: email,
                    phone: phone,
                    company: {
                        name: company
                    }
                }
            );

            console.log(response.data);

            setSuccess("User Added Successfully!");

            setTimeout(() => {
                navigate("/users");
            }, 1000);

        }
        catch (error) {
            console.log(error);
        }
    };

    return (

        <div className="container">

            <div className="row justify-content-center">

                <div className="col-md-8">

                    <h2 className="mb-4">Add User</h2>

                    {
                        success &&
                        <div className="alert alert-success">
                            {success}
                        </div>
                    }

                    <form onSubmit={addUser}>

                        <div className="mb-3">

                            <label>Name</label>

                            <input
                                type="text"
                                className="form-control"
                                value={name}
                                onChange={(e) =>
                                    setName(e.target.value)
                                }
                                required
                            />

                        </div>

                        <div className="mb-3">

                            <label>Email</label>

                            <input
                                type="email"
                                className="form-control"
                                value={email}
                                onChange={(e) =>
                                    setEmail(e.target.value)
                                }
                                required
                            />

                        </div>

                        <div className="mb-3">

                            <label>Phone</label>

                            <input
                                type="text"
                                className="form-control"
                                value={phone}
                                onChange={(e) =>
                                    setPhone(e.target.value)
                                }
                                required
                            />

                        </div>

                        <div className="mb-3">

                            <label>Company Name</label>

                            <input
                                type="text"
                                className="form-control"
                                value={company}
                                onChange={(e) =>
                                    setCompany(e.target.value)
                                }
                                required
                            />

                        </div>

                        <button
                            type="submit"
                            className="btn btn-success"
                        >
                            Add User
                        </button>

                    </form>

                </div>

            </div>

        </div>
    );
}

export default AddUser;