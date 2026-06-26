import { API_URL } from "../config";
import { Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";


function Login() {
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const { setToken, setUser } = useContext(AuthContext);


  const handleSubmit = async (e) => {

    e.preventDefault();

    try {
      const response = await axios.post(
        `${API_URL}/login`,
        {
          email,
          password,
        }
      );

      localStorage.setItem(
        "token",
        response.data.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      );

      setToken(response.data.token);

      setUser(response.data.user);

      toast.success("Login Successful"); //toast

      console.log("FULL RESPONSE =", response.data);
      console.log("ROLE =", response.data.user.role);

      if (response.data.user.role.trim() === "admin") {
        console.log("ADMIN LOGIN");
        navigate("/admin");
      }
      else {
        console.log("USER LOGIN");
        navigate("/dashboard");
      }

    }

  catch (error) {
  console.log(error.response?.data);
  console.log(error.response?.status);

  toast.error(
    error.response?.data?.message || "Login Failed"
  );
}
  };


  return (
    <div className="card">
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

        <p>
          <Link to="/forgot-password">
            Forgot Password?
          </Link>
        </p>

      </form>
      <p> Don't have account?please Register First
        &nbsp;<Link to={"/register"}>Register</Link>
      </p>

    </div>
  );
}

export default Login;