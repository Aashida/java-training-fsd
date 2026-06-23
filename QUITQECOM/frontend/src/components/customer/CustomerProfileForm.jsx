const CustomerProfileForm = ({
    profile,
    setProfile,
    updateProfile
}) => {

    return (

        <div className="card shadow border-0">

            <div className="card-body">

                <h4 className="fw-bold mb-4">
                    My Profile
                </h4>

                <div className="row">

                    <div className="col-md-6 mb-3">

                        <label className="form-label">
                            First Name
                        </label>

                        <input
                            type="text"
                            className="form-control"
                            value={profile.firstName || ""}
                            onChange={(e) =>
                                setProfile({
                                    ...profile,
                                    firstName:
                                        e.target.value
                                })
                            }
                        />

                    </div>

                    <div className="col-md-6 mb-3">

                        <label className="form-label">
                            Last Name
                        </label>

                        <input
                            type="text"
                            className="form-control"
                            value={profile.lastName || ""}
                            onChange={(e) =>
                                setProfile({
                                    ...profile,
                                    lastName:
                                        e.target.value
                                })
                            }
                        />

                    </div>

                    <div className="col-md-6 mb-3">

                        <label className="form-label">
                            Phone Number
                        </label>

                        <input
                            type="text"
                            className="form-control"
                            value={profile.phoneNumber || ""}
                            onChange={(e) =>
                                setProfile({
                                    ...profile,
                                    phoneNumber:
                                        e.target.value
                                })
                            }
                        />

                    </div>

                    <div className="col-md-6 mb-3">

                        <label className="form-label">
                            Username
                        </label>

                        <input
                            type="text"
                            className="form-control"
                            value={profile.username || ""}
                            disabled
                        />

                    </div>

                    <div className="col-md-12 mb-3">

                        <label className="form-label">
                            Email
                        </label>

                        <input
                            type="email"
                            className="form-control"
                            value={profile.email || ""}
                            disabled
                        />

                    </div>

                    <div className="col-md-12 mb-4">

                        <label className="form-label">
                            Address
                        </label>

                        <textarea
                            rows="4"
                            className="form-control"
                            value={profile.address || ""}
                            onChange={(e) =>
                                setProfile({
                                    ...profile,
                                    address:
                                        e.target.value
                                })
                            }
                        />

                    </div>

                </div>

                <button
                    className="btn btn-dark"
                    onClick={updateProfile}
                >
                    Update Profile
                </button>

            </div>

        </div>

    );
};

export default CustomerProfileForm;