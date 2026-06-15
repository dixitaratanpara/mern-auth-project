import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
   
    const { token , setToken} = useContext(AuthContext);

    console.log("Context Token:", token);

    const logout = () => {
        localStorage.removeItem("token");
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
                    <Link to="/profile">Profile</Link>
                      {"|"} 
                    &nbsp; 
                    <button onClick={logout}>Logout</button>
                </>
            )}


        </div>
    );
}
export default Navbar;