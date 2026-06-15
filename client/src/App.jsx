import { Route, Routes } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import { useState } from 'react';
import Register from './components/Register';
import Login from "./components/Login";
import Profile from "./components/Profile";
import Navbar from './components/Navbar';

import './App.css'

function App() {

  return (
    <div>
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
            <ProtectedRoute>
              <Profile></Profile>
            </ProtectedRoute>
          }
        />

      </Routes>
    </div>


  );

}

export default App;
