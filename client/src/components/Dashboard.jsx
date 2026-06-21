import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Dashboard() {

    const { user } = useContext(AuthContext);

    return (
    <div className="card">

        <h2>
            👋 Welcome, {user?.name}
        </h2>

        <p>
            <strong>Name:</strong> {user?.name}
              <br></br>
            <strong>Email:</strong> {user?.email}
        </p>

        <div className="dashboard-grid">

            <div className="dashboard-box">
                <h3>👤</h3>
                <p>Profile</p>
            </div>

            <div className="dashboard-box">
                <h3>🔐</h3>
                <p>Security</p>
            </div>

            <div className="dashboard-box">
                <h3>⚡</h3>
                <p>Actions</p>
            </div>

        </div>

        <br />
    </div>
);
}

export default Dashboard;