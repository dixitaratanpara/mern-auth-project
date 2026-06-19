import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Dashboard() {

    const { user } = useContext(AuthContext);

    return (
    <div className="card">

        <h2>
            👋 Welcome, {user?.name}
        </h2>

        <br />

        <p>
            <strong>Name:</strong> {user?.name}
        </p>

        <br />

        <p>
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

        {/* <h3>Quick Actions</h3>

        <br /> */}

        {/* <button>
            ✏️ Edit Profile
        </button>

        <br /><br />

        <button>
            🔐 Change Password
        </button>

        <br /><br />

        <button>
            🚪 Logout
        </button> */}

    </div>
);
}

export default Dashboard;