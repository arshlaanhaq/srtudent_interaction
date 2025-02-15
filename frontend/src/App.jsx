import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/register";
import Dashboard from "./pages/dashboard";
import AuthProvider from "./context/AuthContext";

export default function App(){
return(
  <Router>
  <AuthProvider>
  <Routes>
    
    <Route path="/" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/dashboard" element={<Dashboard />} />
  </Routes>
</AuthProvider>
</Router>

);
}
