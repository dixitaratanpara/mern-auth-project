import axios from "axios";
import { useState, useEffect } from "react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";

function Profile() {
    const { user, setUser } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);
    const [editMode, setEditMode] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [image, setImage] = useState(null);


    useEffect(() => {

        //get profile
        const getProfile = async () => {
            try {
                const token = localStorage.getItem("token");
                console.log("Token:", token);

                const response = await axios.get(
                    "http://localhost:5000/profile", {
                    headers: {
                        authorization: token,
                    },
                }
                );

                await new Promise((resolve) =>          //for loading in profile 
                    setTimeout(resolve, 3000)
                );

                setUser(response.data.user);
                console.log(response.data.user);
                setLoading(false);
                setName(response.data.user.name);
                setEmail(response.data.user.email);
            }

            catch (error) {
                console.log(error.response?.data);
                setLoading(false);
            }
        };
        getProfile();
    }, []);

    if (loading) { return <h2>Loading....</h2> }


    //edit profile and then save it   
    const saveProfile = async () => {
        try {

            const token = localStorage.getItem("token");

            const response = await axios.put(
                "http://localhost:5000/profile",
                {
                    name,
                    email,
                },
                {
                    headers: {
                        authorization: token,
                    },
                }
            );

            setUser(response.data.user);

            setEditMode(false);

            console.log(response.data);
            toast.success("Profile Updated Successfully");

        } catch (error) {
            console.log(error.response?.data);
        }
    };


    //delete account
    const deleteAccount = async () => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete your account?"
        );

        if (!confirmDelete) return;
        try {
            const token = localStorage.getItem("token");

            await axios.delete(
                "http://localhost:5000/profile",
                {
                    headers: {
                        authorization: token,
                    },
                }
            );

            localStorage.removeItem("token");
            localStorage.removeItem("user");
            toast.success("Account Deleted");
            window.location.href = "/login";

        }
        catch (error) {
            console.log(error.response?.data);
        }
    };


    //change password
    const changePassword = async () => {
        try {
            const token =
                localStorage.getItem("token");

            const response = await axios.put(
                "http://localhost:5000/change-password",
                {
                    oldPassword,
                    newPassword,
                },
                {
                    headers: {
                        authorization: token,
                    },
                }
            );

            toast.success(response.data.message);

            setOldPassword("");
            setNewPassword("");
        }
        catch (error) {

            toast.error(error.response?.data?.message);

        }
    };

    //uplod profile picture
    const uploadImage = async () => {
        try {
            const token = localStorage.getItem("token");

            const formData = new FormData();

            formData.append("image", image);

            const response = await axios.put(
                "http://localhost:5000/upload-profile-image",
                formData,
                {
                    headers: {
                        authorization: token,
                    },
                }
            );
            console.log(response.data);
        }
        catch (error) {
            console.log(error);
        }
    };


    //logout 
    const logout = () => {
        localStorage.removeItem("token");
        window.location.reload();
    };


    return (
        <div className="card">
            <h2>My Profile Page</h2>


            <input
                type="file"
                onChange={(e) =>
                    setImage(e.target.files[0])
                }
            />
            <button onClick={uploadImage}>
                Upload Photo
            </button>
            <p>Hello</p>
            {user?.profileImage && (

                <img
                    src={`http://localhost:5000/uploads/${user.profileImage}`}
                    alt="Profile"
                    width="150"
                />

            )}
            <p><strong>Name:</strong> {user?.name}</p>
            <p><strong>Email:</strong> {user?.email}</p>

            <button
                onClick={() =>
                    setEditMode(!editMode)}
            >
                Edit Profile
            </button>
            {editMode && (
                <>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) =>
                            setName(e.target.value)}
                    />

                    <br />

                    <input
                        type="email"
                        value={email}
                        onChange={(e) =>
                            setEmail(e.target.value)}
                    />
                    <br />
                    <br />

                    <button onClick={saveProfile}>
                        Save Changes
                    </button>
                </>
            )}
            &nbsp;

            <h3>Change Password</h3>
            <input
                type="password"
                placeholder="Old Password"
                value={oldPassword}
                onChange={(e) =>
                    setOldPassword(e.target.value)}
            />
            <br /><br />

            <input
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) =>
                    setNewPassword(e.target.value)}
            />

            <br /><br />

            <button onClick={changePassword}>
                Change Password
            </button>

            &nbsp;
            <button onClick={deleteAccount}>
                Delete Account
            </button>

            &nbsp;
            <button onClick={logout}>Logout</button>
        </div>
    );
}

export default Profile;