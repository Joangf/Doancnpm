import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import "../pages/Login.css";
import TickingSuccess from "../utils/TickingSuccess";
import Register from "../components/AuthForm/Reg"

const API_URL = import.meta.env.VITE_BACKEND_URL;

const LogoIcon = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 2.5L37.5 12.5V32.5L20 22.5L2.5 32.5V12.5L20 2.5Z" stroke="#FFD700" strokeWidth="2" strokeLinejoin="round"/>
    <path d="M2.5 12.5L20 22.5L37.5 12.5" stroke="#FFD700" strokeWidth="2" strokeLinejoin="round"/>
    <path d="M20 37.5V22.5" stroke="#FFD700" strokeWidth="2" strokeLinejoin="round"/>
  </svg>
);

const OAuthRegister = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [submitDone, setSubmitDone] = useState(false);
  const [invalidSubmit, setInvalidSubmit] = useState(false);
  const [params] = useSearchParams();
  
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: "",
    role: "USER",
    confirmPassword: "",
    otp: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    if(invalidSubmit) setInvalidSubmit(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (formData.password !== formData.confirmPassword){
      setInvalidSubmit(true);
      return;
    }

    setIsLoading(true);

    try {
      const { confirmPassword, otp, ...registerData } = formData;
      
      console.log("OAuth Registration attempt:", registerData);

      const response = await fetch(`${API_URL}/auth/complete-oauth-register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(registerData),

      });

      if (response.ok) {
        // Handle success - perhaps go to OTP or directly login depending on flow
        setSubmitDone(true);
        setTimeout(async () => {
            setSubmitDone(false);
            // Navigate to login or automatically log them in
            setIsLoggedIn(true);
            const data = await response.json();
            localStorage.setItem('authToken', data.result.token);
            localStorage.setItem('idUser', data.result.id);
            localStorage.setItem('isLoggedIn', 'true');
            setIsLoggedIn(true);
            navigate("/"); 
        }, 2000);
      } else {
        setInvalidSubmit(true);
      }
    } catch (error) {
      console.error("Request failed:", error);
      setInvalidSubmit(true);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    const emailFromUrl = params.get("email");
    
    if (emailFromUrl || nameFromUrl) {
      setFormData(prev => ({
        ...prev,
        email: emailFromUrl || ""
      }));
    }
  }, [params]);

  return (
    <div className="login-page">
      <TickingSuccess 
        isVisible={submitDone}
        message="Registration Successful"
      />
      <div className="login-container">
        <div className="login-header">
          <button className="back-button" onClick={() => navigate("/")}>
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
            <LogoIcon />
            <div className="logo-text">
              <span className="logo-keazon">KeazoN</span>
              <span className="logo-books">BOOKS</span>
            </div>
          </div>
        </div>

        <div className="auth-content">
          {/* Modified Tab Section - Visual Only */}
          <div className="auth-tabs">
            <button
              className="tab-button active"
              style={{ cursor: 'default' }}
            >
              Complete Registration
            </button>
          </div>

          <div className="auth-form-container">
            <Register 
              formData={formData}
              handleSubmit={handleSubmit}
              handleInputChange={handleInputChange}
              isLoading={isLoading}
              invalidSubmit={invalidSubmit}
            />
          </div>
            
          {/* Footer removed as requested since there are no other tabs */}
        </div>
      </div>
    </div>
  );
};

export default OAuthRegister;