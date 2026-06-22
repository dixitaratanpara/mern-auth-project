import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function AdminDashboard() {

    const { user } = useContext(AuthContext);

    return (

        <div className="card">

            <h2>👨‍💼 Admin Dashboard</h2>

            <br />

            <h3>
                Welcome {user?.name}
            </h3>

            <br />

            <p>
                <strong>Role :</strong> Admin
            </p>

            <br />

            <h3>Admin Features</h3>

            <br />

            <button>
                👥 View Users
            </button>

            <br /><br />

            <button>
                🗑 Delete User
            </button>

            <br /><br />

            <button>
                ✏️ Change Role
            </button>

        </div>

    );

}

export default AdminDashboard;