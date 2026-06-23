import axios from "axios";
import { useEffect, useState } from "react";

import CustomerNavbar from "../../components/Navbar-Customer";

import { toast } from "react-toastify";
import CustomerProfileForm from "../../components/customer/CustomerProfileForm";

const CustomerProfile = () => {

    const [profile, setProfile] =
        useState({});

    const token =
        localStorage.getItem("token");

    const config = {
        headers: {
            Authorization:
                "Bearer " + token
        }
    };

    const fetchProfile = async () => {

        try {

            const response =
                await axios.get(
                    "http://localhost:8080/api/customer/profile",
                    config
                );

            setProfile(response.data);

        } catch (err) {

            console.log(err);

        }
    };

    const updateProfile = async () => {

        try {

            await axios.put(
                "http://localhost:8080/api/customer/profile",
                {
                    firstName:
                        profile.firstName,
                    lastName:
                        profile.lastName,
                    phoneNumber:
                        profile.phoneNumber,
                    address:
                        profile.address
                },
                config
            );

            toast.success(
                "Profile Updated Successfully"
            );

        } catch (err) {

            console.log(err);

        }
    };

    useEffect(() => {

        fetchProfile();

    }, []);

    return (

        <>
            <CustomerNavbar />

            <div className="container py-5">

                <CustomerProfileForm
                    profile={profile}
                    setProfile={setProfile}
                    updateProfile={
                        updateProfile
                    }
                />

            </div>

        </>
    );
};

export default CustomerProfile;