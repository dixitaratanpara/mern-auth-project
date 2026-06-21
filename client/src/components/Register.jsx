import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Register() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                "http://localhost:5000/register",
                {
                    name,
                    email,
                    password,
                }
            );

            console.log(response.data);
            toast.success("Registration Successfully");

            setTimeout(() => {
                navigate("/login");
            }, 1500);
        }
        catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="card">
            <h2>Register Page</h2>

            <form onSubmit={handleSubmit}>

                <input type="text"
                    placeholder="Enter Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}></input>
                <br></br><br></br>

                <input type="email"
                    placeholder="Enter Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}></input>
                <br></br><br></br>

                <input type="password"
                    placeholder="Enter Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"></input>
                <br></br><br></br>

                <button type="submit">Register</button>

            </form>

            <p>
                Already have an account?
                <Link to="/login"> Login</Link>
            </p>

        </div>
    );
}

export default Register;