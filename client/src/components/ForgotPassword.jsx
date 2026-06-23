import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function ForgotPassword() {
    const [email, setEmail] = useState("");
    
    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const response = await axios.post(

                "http://localhost:5000/forgot-password",

                {
                    email,
                }

            );

            toast.success(response.data.message);

            setEmail("");

        }

        catch (error) {

            toast.error(

                error.response?.data?.message ||  "Something went wrong"

            );

        }

    };

    return (

        <div className="card">

            <h2>Forgot Password</h2>

            <br />

            <form onSubmit={handleSubmit}>

                <input

                    type="email"

                    placeholder="Enter Email"

                    value={email}

                    onChange={(e) =>

                        setEmail(e.target.value)

                    }

                    required

                />

                <br /><br />

                <button type="submit">

                    Send Reset Link

                </button>

            </form>

        </div>

    );

}

export default ForgotPassword;