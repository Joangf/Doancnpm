import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SessionManager.css";
const API_URL = import.meta.env.VITE_BACKEND_URL;
const TIMEOUT_SESSION = import.meta.env.VITE_TIMEOUT_SESSION || 5 * 60 * 1000; // Default to 5 minutes

const SessionManager = ({ isLoggedIn, setIsLoggedIn, children }) => {
  const navigate = useNavigate();
  const [isSessionVerified, setIsSessionVerified] = useState(false);
  const [isAppActive, setIsAppActive] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const intervalRef = useRef(null);

  const refreshAuthToken = async () => {
    setLoading(true);
    
    if (intervalRef.current) clearInterval(intervalRef.current);

    const refreshToken = localStorage.getItem("authToken");
    
    if (!refreshToken) {
      handleLogout();
      return;
    }

    try {
      const response = await fetch(`${API_URL}/auth/refresh`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: refreshToken }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("authToken", data.result.token);
        
        setIsAppActive(true);
        setIsSessionVerified(true);
        startPauseTimer();
      } else {
        handleLogout();
      }
    } catch (error) {
      console.error("Error during token refresh:", error);
    } finally {
      setLoading(false);
    }
  };

  const startPauseTimer = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setIsAppActive(false);
    }, TIMEOUT_SESSION);
  };

  const handleLogout = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    localStorage.removeItem("authToken");
    localStorage.removeItem("idUser");
    sessionStorage.setItem("isLoggedIn", "false");
    setIsLoggedIn(false);
    navigate("/login");
  };


  useEffect(() => {
    if (!isLoggedIn) {
      setIsSessionVerified(true);
      setIsAppActive(true);
      return;
    }
    refreshAuthToken();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isLoggedIn]);

  return (
    <>
      {isSessionVerified && (
        <div style={{ display: isAppActive ? "" : "none" }}>
          {children}
        </div>
      )}
      <div
        className="session-paused-wrapper"
        style={{
          display: isAppActive ? "none" : "flex", // Use flex to center usually
          zIndex: 1000,
        }}
      >
        <div className="session-paused-card">
          <div className="session-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="64"
              height="64"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
            </svg>
          </div>

          <h1 className="session-title">
            {/* Optional: Change title based on context */}
            {loading ? "Verifying Session..." : "Session Paused"}
          </h1>

          <p className="session-text">
            {loading 
              ? "Please wait while we verify your security token." 
              : "For your security, the application has been paused due to inactivity (or page reload). Please refresh your session to continue working."}
          </p>

          <button
            onClick={refreshAuthToken}
            className="refresh-btn"
            disabled={loading}
          >
            {loading ? "Verifying..." : "Resume Session"}
          </button>
        </div>
      </div>
    </>
  );
};

export default SessionManager;