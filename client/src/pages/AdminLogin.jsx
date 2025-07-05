import React, { useState } from "react";
import axios from "axios";
import { HiEye, HiEyeOff, HiLockClosed, HiMail } from "react-icons/hi";

const AdminLogin = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await axios.post("/api/appointments/admin/login", { email, password });
      if (res.data.token) {
        localStorage.setItem("adminToken", res.data.token);
        onLogin();
      } else {
        setError("Invalid response from server");
      }
    } catch (err) {
      setError("Invalid email or password");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-ash px-2">
      <form
        onSubmit={handleSubmit}
        className="bg-ivory border border-gold/30 p-8 rounded-xl shadow-xl w-full max-w-md flex flex-col gap-6"
        aria-busy={loading}
      >
        <h2 className="text-3xl font-serif font-bold text-navy text-center mb-2">Admin Login</h2>
        <p className="text-center text-ash-700 font-sans mb-4">Sign in to manage appointments</p>
        <div className="relative">
          <label htmlFor="admin-email" className="sr-only">Email</label>
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gold">
            <HiMail className="text-xl" />
          </span>
          <input
            id="admin-email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-gold w-full text-base font-sans bg-ash text-navy placeholder:text-ash-400"
            required
            autoComplete="username"
            aria-label="Admin Email"
          />
        </div>
        <div className="relative">
          <label htmlFor="admin-password" className="sr-only">Password</label>
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gold">
            <HiLockClosed className="text-xl" />
          </span>
          <input
            id="admin-password"
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="pl-10 pr-10 py-3 border rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-gold w-full text-base font-sans bg-ash text-navy placeholder:text-ash-400"
            required
            autoComplete="current-password"
            aria-label="Admin Password"
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-ash-400 hover:text-gold focus:outline-none"
            tabIndex={-1}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <HiEyeOff className="text-xl" /> : <HiEye className="text-xl" />}
          </button>
        </div>
        {error && <div className="text-red-600 text-sm text-center font-medium animate-fade-in">{error}</div>}
        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 bg-gold text-navy font-semibold py-3 px-4 rounded-lg shadow-md hover:bg-navy hover:text-gold transition-all duration-200 text-lg disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
