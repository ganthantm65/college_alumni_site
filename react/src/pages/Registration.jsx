import React, { useState } from "react";
import college from "../assets/home-page-images/college.jpg";
import { useNavigate } from "react-router-dom";
import { Eye, EyeClosed, EyeOff } from "lucide-react";

const Registeration = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:3000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_name: userName, pass_word: password,user_role:"ALUMNI" }),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.message || "Login failed. Please try again.");

      localStorage.setItem("Token", data.token);
      localStorage.setItem("user_name", data.user.user_name);

      setTimeout(() => {
        navigate("/"); 
        window.location.reload();
      }, 300);
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  return (
    <div
      className="w-full min-h-screen flex flex-col md:flex-row bg-cover bg-center"
      style={{ backgroundImage: `url(${college})` }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/80 via-blue-800/75 to-blue-900/80 md:hidden flex items-center justify-center">
        <div className="text-center px-4 space-y-2">
          <h1 className="text-4xl sm:text-5xl text-white font-bold tracking-tight">
            GCE Tirunelveli
          </h1>
          <p className="text-xl text-blue-100 font-light">Alumni Portal</p>
        </div>
      </div>
      <div className="w-full md:w-1/2 md:h-screen flex flex-col justify-center items-center px-6 sm:px-12 py-12 bg-white/95 md:bg-white/90 backdrop-blur-md relative z-10 shadow-2xl rounded-lg md:rounded-none">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Welcome</h2>
            <p className="text-gray-600">Register your account in alumni portal</p>
          </div>
          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md animate-shake">
              <p className="text-red-800 text-sm font-medium">{error}</p>
            </div>
          )}
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <input
                id="username"
                type="text"
                placeholder="Enter your username"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm transition-all duration-200 hover:border-gray-400"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                disabled={isLoading}
                required
                autoComplete="username"
              />
            </div>
            <div className="space-y-2 relative">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Set your password"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm transition-all duration-200 hover:border-gray-400"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
                required
                autoComplete="current-password"
              />
              <button
                type="button"
                className="absolute inset-y-0 top-5 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
                disabled={isLoading}
              >
                {showPassword ? (
                  <Eye size={25} className="text-gray-400"/>
                ) : (
                  <EyeOff size={25} className="text-gray-400"/>
                )}
              </button>
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </button>
          </form>
        </div>
      </div>
      <div className="hidden md:flex w-1/2 h-screen items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/70 via-blue-800/65 to-blue-900/70 flex items-center justify-center">
          <div className="text-center px-8 space-y-4 animate-fade-in">
            <h1 className="text-5xl lg:text-6xl text-white font-bold tracking-tight leading-tight">
              GCE Tirunelveli
            </h1>
            <div className="w-24 h-1 bg-white/50 mx-auto rounded-full"></div>
            <p className="text-2xl lg:text-3xl text-blue-100 font-light">
              Alumni Portal
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registeration;
