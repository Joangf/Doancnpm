import "../Login.css";
import AnimatedSubmitButton from "../AnimatedSubmitButton";
const Forgot = ({formData ,handleSubmit, handleInputChange, isLoading, setActiveTab }) => (
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
    <AnimatedSubmitButton
      isLoading={isLoading}
      idleText="Reset"
      loadingText="Resetting..."
    />
    <button
      type="button"
      className="back-to-login-link"
      onClick={() => setActiveTab("login")}
    >
      Back to Login
    </button>
  </form>
);
export default Forgot;
