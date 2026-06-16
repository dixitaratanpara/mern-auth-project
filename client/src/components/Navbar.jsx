import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Navbar() {

    const { token, setToken, user, } = useContext(AuthContext);

    console.log("Context Token:", token);

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setToken(null);
        window.location.href = "/login";
    };



    return (
        <div>
            {!token ? (
                <><Link to="/register">Register</Link>
                    {"|"}

                    <Link to="/Login">Login</Link>
                    {"|"}
                </>
            ) : (
                <>
                    <span>
                        Hello {user?.name}
                    </span>
                    &nbsp;
                    {"|"}
                       &nbsp;
                       
                    <Link to="/profile">Profile</Link>
                    &nbsp;
                    {"|"}
                    &nbsp;
                    <button onClick={logout}>Logout</button>
                    
                </>
            )}


        </div>
    );
}
export default Navbar;