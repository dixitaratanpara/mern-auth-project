import axios from "axios";
import { useState, useEffect } from "react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Profile() {
    const { user } = useContext(AuthContext);
    // const [user, setUser] = useState(null);
    

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
                setUser(response.data);
            }
            catch (error) {
                console.log(error.response?.data);
            }
        };
        getProfile();

    }, []);

    const logout = () => {
        localStorage.removeItem("token");
        window.location.reload();
    };

    return (
        <div>
            <h2>Profile Page</h2>
            {/* {user && (<>{user.message}</>)} */}
            
            <h3>
                Email: {user?.email}
            </h3>
            <button onClick={logout}>Logout</button>
        </div>
    );
}

export default Profile;