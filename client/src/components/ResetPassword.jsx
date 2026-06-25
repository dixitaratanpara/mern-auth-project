import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function ResetPassword() {

    const { token } = useParams();

    const navigate = useNavigate();

    const [password, setPassword] = useState("");

    const [confirmPassword, setConfirmPassword] = useState("");


    const handleSubmit = async (e) => {

        e.preventDefault();

        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        const passwordRegex =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

        if (!passwordRegex.test(password)) {
            toast.error(
                "Password must contain 8+ chars, 1 uppercase, 1 lowercase, 1 number and 1 special character"
            );
            return;
        }


        try {
            const response = await axios.post(
                `http://localhost:5000/reset-password/${token}`,
                {
                    password,
                }
            );

            toast.success(response.data.message);

            setTimeout(() => {
                navigate("/login");
            }, 2000);

        }

        catch (error) {
            toast.error(
                error.response?.data?.message || "Something went wrong"
            );
        }
    };


    return (

        <div className="card">
            <h2>Reset Password</h2>
            <br />

            <form onSubmit={handleSubmit}>
                <input
                    type="password"
                    placeholder="New Password"
                    value={password}
                    onChange={(e) =>
                        setPassword(e.target.value)
                    }
                    required
                />

                <br /><br />

                <input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) =>
                        setConfirmPassword(e.target.value)
                    }
                    required
                />

                <br /><br />

                <button type="submit">
                    Reset Password
                </button>
            </form>

        </div>

    );

}

export default ResetPassword;