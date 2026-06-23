import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const SellerProfileForm = () => {

    const [profile, setProfile] = useState({
        name: "",
        shopName: "",
        businessAddress: "",
        gstNumber: "",
        email: "",
        username: ""
    });

    const fetchProfile = async () => {

        try {

            const token = localStorage.getItem("token");

            const config = {
                headers: {
                    Authorization: "Bearer " + token
                }
            };

            const response = await axios.get(
                "http://localhost:8080/api/seller/profile",
                config
            );

            setProfile(response.data);

        } catch (err) {
            console.log(err);
        }
    };

    const updateProfile = async () => {

        try {

            const token = localStorage.getItem("token");

            const config = {
                headers: {
                    Authorization: "Bearer " + token
                }
            };

            await axios.put(
                "http://localhost:8080/api/seller/profile",
                {
                    shopName: profile.shopName,
                    businessAddress: profile.businessAddress,
                    gstNumber: profile.gstNumber
                },
                config
            );

            toast.success("Profile Updated Successfully");

        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchProfile();
    }, []);

    return (

        <div
            className="card border-0 shadow-sm"
            style={{
                borderRadius: "20px"
            }}
        >

            <div className="card-body p-4">

                <div className="row g-4">

                    <div className="col-md-6">

                        <label className="form-label">
                            Name
                        </label>

                        <input
                            type="text"
                            className="form-control"
                            value={profile.name}
                            disabled
                        />

                    </div>

                    <div className="col-md-6">

                        <label className="form-label">
                            Username
                        </label>

                        <input
                            type="text"
                            className="form-control"
                            value={profile.username}
                            disabled
                        />

                    </div>

                    <div className="col-md-6">

                        <label className="form-label">
                            Email
                        </label>

                        <input
                            type="email"
                            className="form-control"
                            value={profile.email}
                            disabled
                        />

                    </div>

                    <div className="col-md-6">

                        <label className="form-label">
                            Shop Name
                        </label>

                        <input
                            type="text"
                            className="form-control"
                            value={profile.shopName}
                            onChange={(e) =>
                                setProfile({
                                    ...profile,
                                    shopName: e.target.value
                                })
                            }
                        />

                    </div>

                    <div className="col-md-12">

                        <label className="form-label">
                            Business Address
                        </label>

                        <textarea
                            className="form-control"
                            rows="3"
                            value={profile.businessAddress}
                            onChange={(e) =>
                                setProfile({
                                    ...profile,
                                    businessAddress:
                                        e.target.value
                                })
                            }
                        />

                    </div>

                    <div className="col-md-6">

                        <label className="form-label">
                            GST Number
                        </label>

                        <input
                            type="text"
                            className="form-control"
                            value={profile.gstNumber}
                            onChange={(e) =>
                                setProfile({
                                    ...profile,
                                    gstNumber: e.target.value
                                })
                            }
                        />

                    </div>

                </div>

                <button
                    className="btn btn-dark mt-4 px-4"
                    onClick={updateProfile}
                >
                    Update Profile
                </button>

            </div>

        </div>

    );
};

export default SellerProfileForm;