import axios from "axios";
import { useEffect, useState } from "react";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import Navbar from "../../components/Navbar";

import {
    setSelectedCategory
} from "../../redux/action/categoryAction";

const PublicCategories = () => {

    const [categories, setCategories] =
        useState([]);

    const dispatch =
        useDispatch();

    const navigate =
        useNavigate();

    const fetchCategories =
        async () => {

            try {

                const response =
                    await axios.get(
                        "http://localhost:8080/api/category/all"
                    );

                setCategories(
                    response.data
                );

            }
            catch (err) {

                console.log(err);

            }

        };

    useEffect(() => {

        fetchCategories();

    }, []);

    return (

        <div
            style={{
                backgroundColor: "#f8f9fa",
                minHeight: "100vh"
            }}
        >

            <Navbar />

            <div className="container py-5">

                <h2 className="fw-bold mb-4">
                    Categories
                </h2>

                <div className="row g-4">

                    {
                        categories.map(
                            category => (

                                <div
                                    key={category.id}
                                    className="col-md-4"
                                >

                                    <div
                                        className="card shadow-sm border-0 h-100"
                                        style={{
                                            cursor: "pointer"
                                        }}
                                        onClick={() => {

                                            dispatch(
                                                setSelectedCategory(
                                                    category.categoryName
                                                )
                                            );

                                            navigate(
                                                "/products"
                                            );

                                        }}
                                    >

                                        <div className="card-body text-center">

                                            <h4>
                                                {
                                                    category.categoryName
                                                }
                                            </h4>

                                        </div>

                                    </div>

                                </div>

                            )
                        )
                    }

                </div>

            </div>

        </div>

    );

};

export default PublicCategories;