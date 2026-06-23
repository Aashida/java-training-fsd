import axios from "axios";
import { useEffect, useState } from "react";

const CategoriesTable = () => {

    const [categories, setCategories] = useState([]);
    const [categoryName, setCategoryName] = useState("");
    const [editId, setEditId] = useState(null);

    const token = localStorage.getItem("token");

    const config = {
        headers: {
            Authorization: "Bearer " + token
        }
    };

    const fetchCategories = async () => {

        try {

            const response = await axios.get(
                "http://localhost:8080/api/category/all"
            );

            setCategories(response.data);

        } catch (err) {
            console.log(err);
        }
    };

    const addCategory = async () => {

        if (!categoryName.trim()) {
            return;
        }

        try {

            await axios.post(
                "http://localhost:8080/api/category/add",
                {
                    categoryName: categoryName
                },
                config
            );

            setCategoryName("");

            fetchCategories();

        } catch (err) {
            console.log(err);
        }
    };

    const updateCategory = async () => {

        try {

            await axios.put(
                `http://localhost:8080/api/category/update/${editId}`,
                {
                    categoryName: categoryName
                },
                config
            );

            setEditId(null);
            setCategoryName("");

            fetchCategories();

        } catch (err) {
            console.log(err);
        }
    };

    const deleteCategory = async (id) => {

        try {

            await axios.delete(
                `http://localhost:8080/api/category/delete/${id}`,
                config
            );

            fetchCategories();

        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    return (

        <div className="card shadow border-0">

            <div className="card-body">

                <div className="d-flex gap-2 mb-4">

                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter category"
                        value={categoryName}
                        onChange={(e) =>
                            setCategoryName(e.target.value)
                        }
                    />

                    {
                        editId ?

                            <button
                                className="btn btn-warning"
                                onClick={updateCategory}
                            >
                                Update
                            </button>

                            :

                            <button
                                className="btn btn-success"
                                onClick={addCategory}
                            >
                                Add
                            </button>
                    }

                </div>

                <table className="table table-hover">

                    <thead className="table-dark">

                        <tr>
                            <th>ID</th>
                            <th>Category Name</th>
                            <th>Actions</th>
                        </tr>

                    </thead>

                    <tbody>

                        {
                            categories.map((category) => (

                                <tr key={category.id}>

                                    <td>{category.id}</td>

                                    <td>
                                        {category.categoryName}
                                    </td>

                                    <td>

                                        <button
                                            className="btn btn-warning btn-sm me-2"
                                            onClick={() => {

                                                setEditId(category.id);

                                                setCategoryName(
                                                    category.categoryName
                                                );

                                            }}
                                        >
                                            Edit
                                        </button>

                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() =>
                                                deleteCategory(
                                                    category.id
                                                )
                                            }
                                        >
                                            Delete
                                        </button>

                                    </td>

                                </tr>

                            ))
                        }

                    </tbody>

                </table>

            </div>

        </div>

    );
};

export default CategoriesTable;