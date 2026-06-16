import axios from "axios";
import { useState, useEffect } from "react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Profile() {
    const { user, setUser } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);
    // const [user, setUser] = useState(null);
    console.log(user);

    const [editMode, setEditMode] = useState(false);

    const [name, setName] = useState("");

    const [email, setEmail] = useState("");


    useEffect(() => {

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

    const saveProfile = async () => {                       //edit profile and then save it
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

        } catch (error) {

            console.log(error.response?.data);

        }
    };

    const logout = () => {
        localStorage.removeItem("token");
        window.location.reload();
    };


    return (
        <div>
            <h2>Profile Page</h2>
            {/* {user && (<>{user.message}</>)} */}
            <p>Hello</p>
            <p> Name: {user?.name}</p>

            <p>Email: {user?.email}</p>
            {/* <p>Edit Mode: {editMode.toString()}</p> */}
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
            <button onClick={logout}>Logout</button>
        </div>
    );
}

export default Profile;