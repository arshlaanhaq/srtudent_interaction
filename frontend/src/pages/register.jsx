import { useState } from "react";
import API from "../api/api"
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student"); 
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await API.post("/auth/register", {
        name,
        email,
        password,
        role,
      });
      alert("Registration successful! Please login.");
      navigate("/");
    } catch (err) {
      console.error("Registration failed:", err.response?.data);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form onSubmit={handleRegister} className="w-full max-w-sm bg-white p-6 shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>

        <input
          type="text"
          placeholder="Full Name"
          className="w-full p-2 border rounded mb-3"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 border rounded mb-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 border rounded mb-3"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <select
          className="w-full p-2 border rounded mb-3"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="student">Student</option>
          {/* <option value="teacher">Teacher</option> */}
        </select>

        <button className="w-full bg-blue-500 text-white p-2 rounded cursor-pointer">
          Register
        </button>

        <p className="mt-4 text-center">
          Already have an account?{" "}
          <a href="/" className="text-blue-500 cursor-pointer">Login</a>
        </p>
      </form>
    </div>
  );
};

export default Register;
