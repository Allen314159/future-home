import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import bg from "../image/bg.jpeg";
import logo from "../image/logo.png";

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({
      ...credentials,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
 
        navigate("/home");
      } else {
        setError(data.message || "Login failed. Please try again.");
      }
    } catch (err) {
      setError("An error occurred. Please try again later.");
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="flex min-h-screen bg-cover bg-center relative"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>
      {/* Left Side */}
      <div className="w-1/2 relative flex flex-col justify-center items-start px-16 z-10">
        <div className="mt-20">
          <h1 className="text-white text-5xl font-extrabold mb-8 underline">FUTURE HOME</h1>
          <h2 className="text-white text-3xl font-bold mb-4">Building the Future...</h2>
          <p className="text-white text-base mb-8 max-w-md">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          <div className="flex gap-2">
            <span className="w-8 h-1 bg-white inline-block rounded"></span>
            <span className="w-4 h-1 bg-white/50 inline-block rounded"></span>
          </div>
        </div>
      </div>
      {/* Right Side */}
      <div className="w-1/2 flex flex-col justify-center items-center z-10">
        <div className="w-full max-w-md p-10 rounded-xl shadow-lg relative bg-white bg-opacity-90">
          <div className="absolute -top-12 right-8">
            <img src={logo} alt="Logo" className="w-20 h-20 drop-shadow-lg" />
          </div>
          <div className="mb-8">
            <p className="text-gray-500 text-xs mb-1">WELCOME BACK</p>
            <h2 className="text-2xl font-semibold mb-2">Log In to your Account</h2>
          </div>
          {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4">{error}</div>}
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-gray-700 text-sm mb-1">Username</label>
              <input 
                type="text" 
                name="username"
                value={credentials.username}
                onChange={handleChange}
                placeholder="Enter username" 
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400" 
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm mb-1">Password</label>
              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"} 
                  name="password"
                  value={credentials.password}
                  onChange={handleChange}
                  placeholder="Enter password" 
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 pr-10" 
                  required
                />
                <span 
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    {showPassword ? (
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12.001C3.226 16.273 7.355 19.5 12 19.5c1.658 0 3.237-.335 4.646-.94M21.065 12.001a10.477 10.477 0 00-2.016-3.775M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                    )}
                  </svg>
                </span>
              </div>
            </div>
            <button 
              type="submit" 
              className="w-full bg-blue-600 text-white py-2 rounded font-semibold text-lg hover:bg-blue-700 transition flex justify-center"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
