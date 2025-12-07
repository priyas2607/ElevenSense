// src/Signup.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LiquidEther from "./components/LiquidEther";
import "./Login.css";

export default function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    otp: "",
    username: "",
    password: "",
  });

  const [step, setStep] = useState("identify");   // identify → otp → create
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const [preToken, setPreToken] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  /* -------------------------------------------------------
     STEP 1 — REQUEST OTP
  ------------------------------------------------------- */
  async function handleGenerateOtp(e) {
    e.preventDefault();
    setError("");
    setInfo("");

    if (!form.email && !form.phone) {
      setError("Please provide an email or phone number.");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch("http://localhost:5000/api/auth/request-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.email || undefined,
          phone: form.phone || undefined,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.message || "Failed to send OTP.");
        return;
      }

      setInfo("OTP sent! (Check your email/SMS or console in dev)");
      setStep("otp");
    } catch (err) {
      setError("Something went wrong sending the OTP.");
    } finally {
      setLoading(false);
    }
  }

  /* -------------------------------------------------------
     STEP 2 — VERIFY OTP
  ------------------------------------------------------- */
  async function handleVerifyOtp(e) {
    e.preventDefault();
    setError("");
    setInfo("");

    if (!form.otp) {
      setError("Enter the OTP.");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("http://localhost:5000/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.email || undefined,
          phone: form.phone || undefined,
          otp: form.otp,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.message || "OTP verification failed.");
        return;
      }

      // Save preToken for account creation
      setPreToken(data.preToken);

      setInfo("OTP verified! Now create your account.");
      setStep("create");
    } catch (err) {
      setError("Something went wrong verifying OTP.");
    } finally {
      setLoading(false);
    }
  }

  /* -------------------------------------------------------
     STEP 3 — CREATE ACCOUNT
  ------------------------------------------------------- */
  async function handleCreateAccount(e) {
    e.preventDefault();
    setError("");
    setInfo("");

    if (!form.username || !form.password) {
      setError("Please enter a username and password.");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(
        "http://localhost:5000/api/auth/create-account",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: form.email || undefined,
            phone: form.phone || undefined,
            username: form.username,
            password: form.password,
            preToken: preToken,   // required by backend
          }),
        }
      );

      const data = await res.json();
      if (!res.ok) {
        setError(data.message || "Signup failed.");
        return;
      }

      setInfo("Account created! Redirecting...");
      setTimeout(() => navigate("/login"), 1000);
    } catch (err) {
      setError("Something went wrong during signup.");
    } finally {
      setLoading(false);
    }
  }

  /* -------------------------------------------------------
     UI RENDERING
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
        <h1 className="auth-title">Create Account</h1>

        <p className="auth-sub">
          {step === "identify" && "Enter your contact information to receive OTP"}
          {step === "otp" && "Enter the OTP sent to your email/phone"}
          {step === "create" && "Choose a username & password"}
        </p>

        {error && <div className="auth-error">{error}</div>}
        {info && <div className="auth-info">{info}</div>}

        {/* STEP 1 — Contact Info */}
        {step === "identify" && (
          <form className="auth-form" onSubmit={handleGenerateOtp}>
            <input
              name="name"
              type="text"
              placeholder="Full name"
              value={form.name}
              onChange={handleChange}
              required
            />

            <input
              name="email"
              type="email"
              placeholder="Email (optional)"
              value={form.email}
              onChange={handleChange}
            />

            <input
              name="phone"
              type="tel"
              placeholder="Phone number (optional)"
              value={form.phone}
              onChange={handleChange}
            />

            <button type="submit" className="auth-btn" disabled={loading}>
              {loading ? "Sending…" : "Generate OTP"}
            </button>
          </form>
        )}

        {/* STEP 2 — OTP */}
        {step === "otp" && (
          <form className="auth-form" onSubmit={handleVerifyOtp}>
            <input
              name="otp"
              type="text"
              placeholder="Enter OTP"
              value={form.otp}
              onChange={handleChange}
              required
            />

            <button type="submit" className="auth-btn" disabled={loading}>
              {loading ? "Verifying…" : "Verify OTP"}
            </button>

            <button
              type="button"
              className="auth-secondary"
              onClick={handleGenerateOtp}
              disabled={loading}
              style={{ marginTop: 10 }}
            >
              Resend OTP
            </button>

            <button
              type="button"
              className="auth-secondary"
              onClick={() => setStep("identify")}
            >
              Edit Contact Info
            </button>
          </form>
        )}

        {/* STEP 3 — Create Account */}
        {step === "create" && (
          <form className="auth-form" onSubmit={handleCreateAccount}>
            <input
              name="username"
              type="text"
              placeholder="Choose a username"
              value={form.username}
              onChange={handleChange}
              required
            />

            <input
              name="password"
              type="password"
              placeholder="Create a password"
              value={form.password}
              onChange={handleChange}
              required
            />

            <button type="submit" className="auth-btn" disabled={loading}>
              {loading ? "Creating…" : "Create Account"}
            </button>

            <button
              type="button"
              className="auth-secondary"
              onClick={() => setStep("otp")}
            >
              Back to OTP
            </button>
          </form>
        )}

        <p className="auth-switch">
          Already have an account?{" "}
          <Link to="/login" className="auth-link">
            Login
          </Link>
        </p>

        <Link to="/" className="back-btn">
          ← Back
        </Link>
      </div>
    </div>
  );
}
