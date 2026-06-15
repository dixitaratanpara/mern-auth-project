import { Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";


function Login() {
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const navigate =useNavigate();
    const { setToken } = useContext(AuthContext);

    const handleSubmit = async (e) => {
    e.preventDefault();

  try {

    const response = await axios.post(
      "http://localhost:5000/login",
      {
        email,
        password,
      }
    );

     localStorage.setItem("token",response.data.token);
    setToken(response.data.token);
    console.log(response.data);

   navigate("/profile");

  } 
  
  catch (error) {
    console.log(error);
  }
};

  return (
    <div>
      <h2>Login Page</h2>

       <form onSubmit={handleSubmit}>
    <input
      type="email"
      placeholder="Enter Email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
    />

    <br /><br />

    <input
      type="password"
      placeholder="Enter Password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
    />

    <br /><br />

    <button type="submit">
      Login
    </button>

  </form>
   <p> Don't have account?please Register First 
     &nbsp;<Link to={"/register"}>Register</Link>
   </p>

    </div>
  );
}

export default Login;