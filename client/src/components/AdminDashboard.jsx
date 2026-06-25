import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { toast } from "react-toastify";


function AdminDashboard() {

    const { user, token } = useContext(AuthContext);

    const [users, setUsers] = useState([]);

    const [page, setPage] = useState(1);

    const [totalPages, setTotalPages] = useState(1);


    //api call admin dashboard
    useEffect(() => {
        const fetchUsers = async () => {

            try {
                const response = await axios.get(
                    `http://localhost:5000/users?page=${page}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                console.log("FULL API RESPONSE =", response.data);

                setUsers(response.data.users);
                setTotalPages(response.data.totalPages);

            }

            catch (error) {
                console.log(error);
            }
        };

        fetchUsers();

    }, [token, page]);



    //delete admin dashboard

    const deleteUser = async (id) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this user?"
        );


        try {
            await axios.delete(
                `http://localhost:5000/users/${id}`,
                {
                    headers: {
                        Authorization: token,
                    },
                }
            );

            setUsers(users.filter((item) => item._id !== id));

            alert("User Deleted Successfully");
        }
        catch (error) {
            console.log(error);
        }
    };


    return (
        <div className="admin-card">

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

            <div className="dashboard-grid">
                <div className="dashboard-box">

                    <h3>👥 </h3>
                    <p>View Users</p>

                </div>
                <div className="dashboard-box">

                    <h3>🗑</h3>
                    <p>Delete User</p>

                </div>

                <div className="dashboard-box">
                    <h3>✏️</h3>
                    <p> View Role</p>
                </div>

            </div>

            <br></br><br></br>
            <div className="dashboard-box">
                <h3>All Users</h3>

                <br />

                <table border="1" cellPadding="10" >
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((item) => (
                            <tr key={item._id}>
                                <td>{item.name}</td>
                                <td>{item.email}</td>
                                <td>{item.role}</td>
                                <td>
                                    <button
                                        className="delete-btn"
                                        onClick={() => deleteUser(item._id)}
                                    >
                                        🗑 Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <br />

            <div className="pagination">
                <button
                    onClick={() => setPage(page - 1)}
                    disabled={page === 1}
                >
                    ⬅ Previous
                </button>

                &nbsp;&nbsp;
                <br></br>

                <span>

                    Page {page} of {totalPages}

                </span>

                &nbsp;&nbsp;

                <button
                    onClick={() => setPage(page + 1)}
                    disabled={page === totalPages}
                >
                    Next ➡
                </button>
            </div>


        </div>

    );

}

export default AdminDashboard;