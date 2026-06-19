import { Route, Routes } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import { useState } from 'react';
import Register from './components/Register';
import Login from "./components/Login";
import Profile from "./components/Profile";
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dashboard from "./components/Dashboard";

import './App.css'

function App() {

  return (
    <div className="app-container">
      <h1>MERN Auth Project</h1>
      {/* /* <Register></Register>
          <hr />
          <Login />
           <hr />
          <Profile /> */ }

      <Navbar></Navbar>

      <Routes>

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />

      </Routes>
      <ToastContainer />
    </div>


  );

}

export default App;
