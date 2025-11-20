import "../Login.css";
import AnimatedSubmitButton from "../AnimatedSubmitButton";

const GOOGLE = import.meta.env.VITE_GOOGLE_URL;
const GITHUB = import.meta.env.VITE_GITHUB_URL;

// Google Icon
const GoogleIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 18 18"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z"
      fill="#4285F4"
    />
    <path
      d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.715H.957v2.332A8.997 8.997 0 0 0 9 18z"
      fill="#34A853"
    />
    <path
      d="M3.964 10.706a5.41 5.41 0 0 1-.282-1.706c0-.593.102-1.17.282-1.706V4.962H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.038l3.007-2.332z"
      fill="#FBBC05"
    />
    <path
      d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.962l3.007 2.332c.708-2.131 2.692-3.715 5.036-3.715z"
      fill="#EA4335"
    />
  </svg>
);

// GitHub Icon
const GithubIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-7.38-4.095-1.605-.15-.39-.825-1.605-1.41-1.935-.48-.27-1.17-.93-.015-.945 1.08-.015 1.845 1.005 2.1 1.44 1.23 2.07 3.21 1.47 3.99 1.125.12-.87.48-1.47.87-1.815-2.64-.3-5.4-1.32-5.4-5.91 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405 1.02 0 2.04.135 3 .405 2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.775 5.595-5.415 5.895.495.435.93 1.29.93 2.61 0 1.875-.015 3.39-.015 3.84 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

const Log = ({
  formData,
  handleSubmit,
  handleInputChange,
  isLoading,
  invalidSubmit,
  setActiveTab,
}) => {
  const handleGoogleLogin = async () => {
    try {
      window.location.href = `${GOOGLE}`;
    } catch (error) {
      console.error("Google login failed:", error);
    }
  };

  const handleGithubLogin = async () => {
    try {
      window.location.href = `${GITHUB}`;
    } catch (error) {
      console.error("GitHub login failed:", error);
    }
  };

  return (
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

      {invalidSubmit && (
        <div className="error-message" style={{ color: "red" }}>
          Email or password is incorrect.
        </div>
      )}

      <AnimatedSubmitButton
        isLoading={isLoading}
        idleText="Login"
        loadingText="Logging in..."
      />

      {/* Separator */}
      <div className="separator">
        <span>OR</span>
      </div>

      {/* Google Button */}
      <button
        type="button"
        className="google-login-btn"
        onClick={handleGoogleLogin}
      >
        <span className="google-icon">
          <GoogleIcon />
        </span>
        <span>Sign in with Google</span>
      </button>

      {/* GitHub Button */}
      <button
        type="button"
        className="github-login-btn"
        onClick={handleGithubLogin}
      >
        <span className="google-icon">
          <GithubIcon />
        </span>
        <span>Sign in with GitHub</span>
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
};

export default Log;
