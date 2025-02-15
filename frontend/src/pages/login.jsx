import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import API from "../api/api"


const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useContext(AuthContext);
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await API.post("/auth/login", {
                email,
                password,
            });
            login(res.data.token);
        } catch (err) {
            // console.error("Login failed:", err.response.data);
            setError(err.response?.data?.message || "Login failed!");
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">

            <form onSubmit={handleSubmit} className="w-full max-w-sm bg-white p-6 shadow-lg rounded-lg">
                <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
                {error && <p className="text-red-500 mb-2">{error}</p>}
                <input type="email" placeholder="Email" className="w-full p-2 border rounded mb-3" onChange={(e) => setEmail(e.target.value)} required/>
                <input type="password" placeholder="Password" className="w-full p-2 border rounded mb-3" onChange={(e) => setPassword(e.target.value)} required/>
                <button className="w-full bg-blue-500 text-white p-2 rounded cursor-pointer">Login</button>
                <p className="mt-4 text-center">
          Don't have an account?{" "}
          <a href="/register" className="text-blue-500 cursor-pointer">Register</a>
        </p>
            </form>
        </div>
    );
};

export default Login;
