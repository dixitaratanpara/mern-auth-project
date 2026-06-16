import axios from "axios";
import { useState, useEffect } from "react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Profile() {
    const { user, setUser } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);
    // const [user, setUser] = useState(null);
    console.log(user);


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
            }

            catch (error) {
                console.log(error.response?.data);
                setLoading(false);
            }
        };

        getProfile();

    }, []);

    if (loading) { return <h2>Loading....</h2> }

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
            <button onClick={logout}>Logout</button>
        </div>
    );
}

export default Profile;