// src/Login.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LiquidEther from "./components/LiquidEther";
import "./Login.css";

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    identifier: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  /* -------------------------------------------------------
     LOGIN REQUEST
  ------------------------------------------------------- */
  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setInfo("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          usernameOrEmail: form.identifier.trim(),
          password: form.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Invalid login credentials.");
        setLoading(false);
        return;
      }

      // Store access token
      if (data.accessToken) {
        localStorage.setItem("accessToken", data.accessToken);
      }

      setInfo("Login successful! Redirecting...");
      setTimeout(() => navigate("/feed"), 800);
    } catch (err) {
      setError("Something went wrong while logging in.");
    } finally {
      setLoading(false);
    }
  }

  /* -------------------------------------------------------
     UI
  ------------------------------------------------------- */
  return (
    <div className="auth-page">
      <div className="auth-bg">
        <LiquidEther
          colors={["#5227FF", "#FF9FFC", "#B19EEF"]}
          autoDemo={true}
          autoSpeed={0.5}
          autoIntensity={2.2}
        />
      </div>

      <div className="auth-container">
        <h1 className="auth-title">Welcome Back</h1>
        <p className="auth-sub">Log in to continue</p>

        {error && <div className="auth-error">{error}</div>}
        {info && <div className="auth-info">{info}</div>}

        <form className="auth-form" onSubmit={handleSubmit}>
          <input
            name="identifier"
            type="text"
            placeholder="Email or Username"
            value={form.identifier}
            onChange={handleChange}
            required
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />

          <button type="submit" className="auth-btn" disabled={loading}>
            {loading ? "Logging in…" : "Login"}
          </button>
        </form>

        <p className="auth-switch">
          Don’t have an account?{" "}
          <Link to="/signup" className="auth-link">
            Create one
          </Link>
        </p>

        <Link to="/" className="back-btn">← Back</Link>
      </div>
    </div>
  );
}
