import React, { act, useState } from "react";
import "./Login.css";
import react from '../assets/react.svg'
const API_URL = import.meta.env.VITE_BACKEND_URL;
const Login = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState("login");
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "sad",
    password: "sda",
    firstName: "sad",
    lastName: "sdd",
    email: "a@gmail.com",
    role: "USER",
    confirmPassword: "asd",
    otp: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (activeTab === "register") {
      const { confirmPassword, otp, ...registerData } = formData;
      setIsLoading(true);
      try {
          const response = await fetch(`${API_URL}/user`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(registerData),
        });
        console.log("Register attempt:", formData);
        if(response.ok){
          setActiveTab('otp');
        }
      } catch (error) {
        console.error("Registration failed:", error);
      } finally {
        setIsLoading(false);
      }
    } else if (activeTab === "login") {
      try {
          const response = await fetch(`${API_URL}/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            identifier: formData.email,
            password: formData.password
          })
        });
        console.log("Login attempt:", formData);
        if (response.ok){
          alert("Successful login");
        }
      }
      catch(error){
        console.error("Login failed:",error);
      }
    } else if (activeTab === "forgot") {
      console.log("Forgot password for:", formData.email);
    } else if (activeTab === "otp") {
        const {email, otp} = formData;
        const otpVerify = {email, otp};
        setIsLoading(true);
        try {
          const response = await fetch(`${API_URL}/verify/email`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(otpVerify)
        });
        console.log("OTP attempt:", otpVerify);
        if(response.ok){
          alert("Successful verfication")
        }

      }
      catch(error){
        console.error("Verification failed:", error);
      }
      finally{
        setIsLoading(false);
      }
    }
  };

  const renderLoginForm = () => (
    <form onSubmit={handleSubmit} className="auth-form">
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          required
          placeholder="Enter your email"
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          required
          placeholder="Enter your password"
        />
      </div>
      <button type="submit" className="auth-button primary">
        Login
      </button>
      <button
        type="button"
        className="forgot-password-link"
        onClick={() => setActiveTab("forgot")}
      >
        Forgot Password?
      </button>
    </form>
  );

  const renderRegisterForm = () => (
    <form onSubmit={handleSubmit} className="auth-form">
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            required
            placeholder="First name"
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            required
            placeholder="Last name"
          />
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleInputChange}
          required
          placeholder="Choose a username"
        />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          required
          placeholder="Enter your email"
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          required
          placeholder="Create a password"
        />
      </div>
      <div className="form-group">
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleInputChange}
          required
          placeholder="Confirm your password"
        />
      </div>
      <button
        type="submit"
        className="auth-button primary"
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <div className="loading-spinner"></div>
            Creating Account...
          </>
        ) : (
          "Create Account"
        )}
      </button>
    </form>
  );

  const renderForgotPasswordForm = () => (
    <form onSubmit={handleSubmit} className="auth-form">
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          required
          placeholder="Enter your email"
        />
      </div>
      <button type="submit" className="auth-button primary">
        Reset Password
      </button>
      <button
        type="button"
        className="back-to-login-link"
        onClick={() => setActiveTab("login")}
      >
        Back to Login
      </button>
    </form>
  );
  const renderOTPForm = () => (
    <form onSubmit={handleSubmit} className="auth-form">
      <div className="form-group">
      <p>We have sent a verification code to your email <i>{formData.email}</i>. Please enter the OTP to verify.</p>
        <label htmlFor="otp">OTP</label>
        <input
          type="otp"
          id="otp"
          name="otp"
          value={formData.otp}
          onChange={handleInputChange}
          required
          placeholder="Enter your OTP"
        />
      </div>
      <button
        type="submit"
        className="auth-button primary"
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <div className="loading-spinner"></div>
            Verifying Account...
          </>
        ) : (
          "Verify"
        )}
      </button>
      <button
        type="button"
        className="back-to-login-link"
        onClick={() => setActiveTab("login")}
      >
        Back to Login
      </button>
    </form>
  );
  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-header">
          <button className="back-button" onClick={onBack}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15 18L9 12L15 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Back
          </button>
          <div className="logo-section">
            <img src={react} alt="" />
            <div className="logo-text">
              <span className="logo-keazon">KeazoN</span>
              <span className="logo-books">BOOKS</span>
            </div>
          </div>
        </div>

        <div className="auth-content">
          <div className="auth-tabs">
            <button
              className={`tab-button ${activeTab === "login" ? "active" : ""}`}
              onClick={() => setActiveTab("login")}
            >
              Login
            </button>
            <button
              className={`tab-button ${
                activeTab === "register" ? "active" : ""
              }`}
              onClick={() => setActiveTab("register")}
            >
              Register
            </button>
          </div>

          <div className="auth-form-container">
            {activeTab === "login" && renderLoginForm()}
            {activeTab === "register" && renderRegisterForm()}
            {activeTab === "forgot" && renderForgotPasswordForm()}
            {activeTab === "otp" && renderOTPForm()}
          </div>

          {activeTab === "login" && (
            <div className="auth-footer">
              <span>Don't have an account? </span>
              <button
                className="link-button"
                onClick={() => setActiveTab("register")}
              >
                Sign up here
              </button>
            </div>
          )}

          {activeTab === "register" && (
            <div className="auth-footer">
              <span>Already have an account? </span>
              <button
                className="link-button"
                onClick={() => setActiveTab("login")}
              >
                Login here
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
