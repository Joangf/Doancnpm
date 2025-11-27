import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";

const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

import { MemoryRouter } from "react-router-dom";
import Login from "../pages/Login.jsx";
import Log from "../components/AuthForm/Log.jsx";
import Reg from "../components/AuthForm/Reg.jsx";
import Forgot from "../components/AuthForm/Forgot.jsx";
import OTP from "../components/AuthForm/OTP.jsx";
import Reset from "../components/AuthForm/Reset.jsx";

describe("Login component", () => {
  it("renders login form by default", () => {
    render(
      <MemoryRouter>
        <Login setIsLoggedIn={vi.fn()} />
      </MemoryRouter>
    );
    
    expect(screen.getAllByRole("button", { name: "Login" })[1]).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter your email")).toBeInTheDocument(); 
    expect(screen.getByPlaceholderText("Enter your password")).toBeInTheDocument();
  });

  it("switches between login and register tabs", () => {
    render(
      <MemoryRouter>
        <Login setIsLoggedIn={vi.fn()} />
      </MemoryRouter>
    );

    const registerTab = screen.getByText("Register");
    fireEvent.click(registerTab);
    expect(screen.getByRole("button", { name: "Create Account" })).toBeInTheDocument();

    const loginTab = screen.getByText("Login");
    fireEvent.click(loginTab);
    expect(screen.getAllByRole("button", { name: "Login" })[1]).toBeInTheDocument();
  });

  it("renders reset password form when clicking forgot password button", () => {
    render(
      <MemoryRouter>
        <Login setIsLoggedIn={vi.fn()} />
      </MemoryRouter>
    );

    const forgotButton = screen.getByText("Forgot Password?");
    fireEvent.click(forgotButton);

    expect(screen.getByRole("button", { name: "Reset" })).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter your email")).toBeInTheDocument();
  });

  it("navigates back to home on back button click", () => {
    render(
      <MemoryRouter>
        <Login setIsLoggedIn={vi.fn()} />
      </MemoryRouter>
    );

    const backButton = screen.getByText("Back");
    fireEvent.click(backButton);

    expect(mockNavigate).toHaveBeenCalledWith("/");
  });
});

describe("Log component", () => {
  const mockHandleSubmit = vi.fn((e) => e.preventDefault());
  const mockHandleInputChange = vi.fn();
  const mockSetActiveTab = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    delete window.location;
    window.location = { href: "" };
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("displays error message when invalidSubmit is true", () => {
    render(
      <Log
        formData={{ email: "", password: "" }}
        handleSubmit={mockHandleSubmit}
        handleInputChange={mockHandleInputChange}
        isLoading={false}
        invalidSubmit={true}
        setActiveTab={mockSetActiveTab}
      />
    );

    expect(screen.getByText("Email or password is incorrect.")).toBeInTheDocument();
  });

  it("calls handleSubmit when login form is submitted", () => {
    const { container } = render(
      <Log
        formData={{ email: "test@email.com", password: "test" }}
        handleSubmit={mockHandleSubmit}
        handleInputChange={mockHandleInputChange}
        isLoading={false}
        invalidSubmit={false}
        setActiveTab={mockSetActiveTab}
      />
    );

    const form = container.querySelector("form");
    fireEvent.submit(form);

    expect(mockHandleSubmit).toHaveBeenCalled();
  });

  it("updates input values on change", () => {
    const { container } = render(
      <Log
        formData={{ email: "", password: "" }}
        handleSubmit={mockHandleSubmit}
        handleInputChange={mockHandleInputChange}
        isLoading={false}
        invalidSubmit={false}
        setActiveTab={mockSetActiveTab}
      />
    );

    const emailInput = screen.getByPlaceholderText("Enter your email");
    fireEvent.change(emailInput, { target: { value: "test@email.com" } });
    expect(mockHandleInputChange).toHaveBeenCalledTimes(1);

    const passInput = screen.getByPlaceholderText("Enter your password");
    fireEvent.change(passInput, { target: { value: "test" } });
    expect(mockHandleInputChange).toHaveBeenCalledTimes(2);
  });

  it("redirects to Google OAuth URL when Google button is clicked", () => {
    const googleUrl = "http://localhost:8080/oauth2/authorization/google";
    vi.stubGlobal("import", {
      meta: {
        env: {
          VITE_GOOGLE_URL: googleUrl,
        },
      },
    });

    render(
      <Log
        formData={{ email: "", password: "" }}
        handleSubmit={mockHandleSubmit}
        handleInputChange={mockHandleInputChange}
        isLoading={false}
        invalidSubmit={false}
        setActiveTab={mockSetActiveTab}
      />
    );

    const googleButton = screen.getByText("Sign in with Google");
    fireEvent.click(googleButton);

    expect(window.location.href).toBe(googleUrl);
  });

  it("redirects to GitHub OAuth URL when GitHub button is clicked", () => {
    const githubUrl = "http://localhost:8080/oauth2/authorization/github";
    vi.stubGlobal("import", {
      meta: {
        env: {
          VITE_GITHUB_URL: githubUrl,
        },
      },
    });

    render(
      <Log
        formData={{ email: "", password: "" }}
        handleSubmit={mockHandleSubmit}
        handleInputChange={mockHandleInputChange}
        isLoading={false}
        invalidSubmit={false}
        setActiveTab={mockSetActiveTab}
      />
    );

    const githubButton = screen.getByText("Sign in with GitHub");
    fireEvent.click(githubButton);

    expect(window.location.href).toBe(githubUrl);
  });
});

describe("Reg component", () => {
  const mockHandleSubmit = vi.fn((e) => e.preventDefault());
  const mockHandleInputChange = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("displays password mismatch error when passwords don't match", () => {
    render(
      <Reg
        formData={{ firstName: "", lastName: "", username: "", email: "", password: "pass123", confirmPassword: "pass456" }}
        handleSubmit={mockHandleSubmit}
        handleInputChange={mockHandleInputChange}
        isLoading={false}
        invalidSubmit={false}
      />
    );

    expect(screen.getByText("Passwords do not match")).toBeInTheDocument();
  });

  it("displays email already used error when invalidSubmit is true", () => {
    render(
      <Reg
        formData={{ firstName: "", lastName: "", username: "", email: "", password: "pass123", confirmPassword: "pass123" }}
        handleSubmit={mockHandleSubmit}
        handleInputChange={mockHandleInputChange}
        isLoading={false}
        invalidSubmit={true}
      />
    );

    expect(screen.getByText("Your email has been used by another user")).toBeInTheDocument();
  });

  it("calls handleSubmit when register form is submitted", () => {
    const { container } = render(
      <Reg
        formData={{ firstName: "John", lastName: "Doe", username: "johndoe", email: "john@email.com", password: "pass123", confirmPassword: "pass123" }}
        handleSubmit={mockHandleSubmit}
        handleInputChange={mockHandleInputChange}
        isLoading={false}
        invalidSubmit={false}
      />
    );

    const form = container.querySelector("form");
    fireEvent.submit(form);

    expect(mockHandleSubmit).toHaveBeenCalled();
  });

  it("updates input values on change", () => {
    const { container } = render(
      <Reg
        formData={{ firstName: "", lastName: "", username: "", email: "", password: "", confirmPassword: "" }}
        handleSubmit={mockHandleSubmit}
        handleInputChange={mockHandleInputChange}
        isLoading={false}
        invalidSubmit={false}
      />
    );

    const fnInput = screen.getByPlaceholderText("First name");
    fireEvent.change(fnInput, { target: { value: "abc" } });
    expect(mockHandleInputChange).toHaveBeenCalledTimes(1);

    const lnInput = screen.getByPlaceholderText("Last name");
    fireEvent.change(lnInput, { target: { value: "def" } });
    expect(mockHandleInputChange).toHaveBeenCalledTimes(2);

    const usrInput = screen.getByPlaceholderText("Choose a username");
    fireEvent.change(usrInput, { target: { value: "test" } });
    expect(mockHandleInputChange).toHaveBeenCalledTimes(3);

    const mailInput = screen.getByPlaceholderText("Enter your email");
    fireEvent.change(mailInput, { target: { value: "test@email.com" } });
    expect(mockHandleInputChange).toHaveBeenCalledTimes(4);

    const passInput = screen.getByPlaceholderText("Create a password");
    fireEvent.change(passInput, { target: { value: "test123" } });
    expect(mockHandleInputChange).toHaveBeenCalledTimes(5);

    const cfmpassInput = screen.getByPlaceholderText("Confirm your password");
    fireEvent.change(cfmpassInput, { target: { value: "test123" } });
    expect(mockHandleInputChange).toHaveBeenCalledTimes(6);
  });

});

describe("Forgot component", () => {
  const mockHandleSubmit = vi.fn((e) => e.preventDefault());
  const mockHandleInputChange = vi.fn();
  const mockSetActiveTab = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders forgot password form", () => {
    render(
      <Forgot
        formData={{ email: "" }}
        handleSubmit={mockHandleSubmit}
        handleInputChange={mockHandleInputChange}
        isLoading={false}
        invalidSubmit={false}
        setActiveTab={mockSetActiveTab}
      />
    );

    expect(screen.getByPlaceholderText("Enter your email")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Reset" })).toBeInTheDocument();
  });

  it("displays error when email doesn't exist", () => {
    render(
      <Forgot
        formData={{ email: "" }}
        handleSubmit={mockHandleSubmit}
        handleInputChange={mockHandleInputChange}
        isLoading={false}
        invalidSubmit={true}
        setActiveTab={mockSetActiveTab}
      />
    );

    expect(screen.getByText("This email doesn't exist")).toBeInTheDocument();
  });

  it("updates email input on change", () => {
    render(
      <Forgot
        formData={{ email: "" }}
        handleSubmit={mockHandleSubmit}
        handleInputChange={mockHandleInputChange}
        isLoading={false}
        invalidSubmit={false}
        setActiveTab={mockSetActiveTab}
      />
    );

    const emailInput = screen.getByPlaceholderText("Enter your email");
    fireEvent.change(emailInput, { target: { value: "test@email.com" } });

    expect(mockHandleInputChange).toHaveBeenCalledTimes(1);
  });

  it("calls handleSubmit when form is submitted", () => {
    const { container } = render(
      <Forgot
        formData={{ email: "test@email.com" }}
        handleSubmit={mockHandleSubmit}
        handleInputChange={mockHandleInputChange}
        isLoading={false}
        invalidSubmit={false}
        setActiveTab={mockSetActiveTab}
      />
    );

    const form = container.querySelector("form");
    fireEvent.submit(form);

    expect(mockHandleSubmit).toHaveBeenCalled();
  });

  it("navigates back to login when back button is clicked", () => {
    render(
      <Forgot
        formData={{ email: "" }}
        handleSubmit={mockHandleSubmit}
        handleInputChange={mockHandleInputChange}
        isLoading={false}
        invalidSubmit={false}
        setActiveTab={mockSetActiveTab}
      />
    );

    const backButton = screen.getByText("Back to Login");
    fireEvent.click(backButton);

    expect(mockSetActiveTab).toHaveBeenCalledWith("login");
  });
});

describe("OTP component", () => {
  const mockHandleSubmit = vi.fn((e) => e.preventDefault());
  const mockHandleInputChange = vi.fn();
  const mockSetActiveTab = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders OTP form", () => {
    render(
      <OTP
        formData={{ email: "test@email.com", otp: "" }}
        handleSubmit={mockHandleSubmit}
        handleInputChange={mockHandleInputChange}
        isLoading={false}
        invalidSubmit={false}
        setActiveTab={mockSetActiveTab}
      />
    );

    expect(screen.getByText("test@email.com")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter your OTP")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Verify" })).toBeInTheDocument();
  });

  it("displays error message when invalidSubmit is true", () => {
    render(
      <OTP
        formData={{ email: "test@email.com", otp: "" }}
        handleSubmit={mockHandleSubmit}
        handleInputChange={mockHandleInputChange}
        isLoading={false}
        invalidSubmit={true}
        setActiveTab={mockSetActiveTab}
      />
    );

    expect(screen.getByText("Invalid OTP.")).toBeInTheDocument();
  });

  it("updates OTP input on change", () => {
    render(
      <OTP
        formData={{ email: "test@email.com", otp: "" }}
        handleSubmit={mockHandleSubmit}
        handleInputChange={mockHandleInputChange}
        isLoading={false}
        invalidSubmit={false}
        setActiveTab={mockSetActiveTab}
      />
    );

    const otpInput = screen.getByPlaceholderText("Enter your OTP");
    fireEvent.change(otpInput, { target: { value: "123456" } });

    expect(mockHandleInputChange).toHaveBeenCalledTimes(1);
  });

  it("calls handleSubmit when form is submitted", () => {
    const { container } = render(
      <OTP
        formData={{ email: "test@email.com", otp: "123456" }}
        handleSubmit={mockHandleSubmit}
        handleInputChange={mockHandleInputChange}
        isLoading={false}
        invalidSubmit={false}
        setActiveTab={mockSetActiveTab}
      />
    );

    const form = container.querySelector("form");
    fireEvent.submit(form);

    expect(mockHandleSubmit).toHaveBeenCalled();
  });
});

describe("Reset component", () => {
  const mockHandleSubmit = vi.fn((e) => e.preventDefault());
  const mockHandleInputChange = vi.fn();
  const mockSetActiveTab = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders reset password form", () => {
    render(
      <Reset
        formData={{ email: "test@email.com", otp: "", password: "", confirmPassword: "" }}
        handleSubmit={mockHandleSubmit}
        handleInputChange={mockHandleInputChange}
        isLoading={false}
        invalidSubmit={false}
        setActiveTab={mockSetActiveTab}
      />
    );

    expect(screen.getByText("test@email.com")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter your Token")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Create a new password")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Confirm your new password")).toBeInTheDocument();
  });

  it("displays error when invalid token is entered", () => {
    render(
      <Reset
        formData={{ email: "test@email.com", otp: "123456", password: "test123", confirmPassword: "test123" }}
        handleSubmit={mockHandleSubmit}
        handleInputChange={mockHandleInputChange}
        isLoading={false}
        invalidSubmit={true}
        setActiveTab={mockSetActiveTab}
      />
    );

    expect(screen.getByText("Invalid Token.")).toBeInTheDocument();
  });

  it("displays password mismatch error when passwords don't match", () => {
    render(
      <Reset
        formData={{ email: "test@email.com", otp: "123456", password: "test123", confirmPassword: "tdsfadfs" }}
        handleSubmit={mockHandleSubmit}
        handleInputChange={mockHandleInputChange}
        isLoading={false}
        invalidSubmit={false}
        setActiveTab={mockSetActiveTab}
      />
    );

    expect(screen.getByText("Passwords do not match")).toBeInTheDocument();
  });

  it("updates input values on change", () => {
    render(
      <Reset
        formData={{ email: "user@email.com", otp: "", password: "", confirmPassword: "" }}
        handleSubmit={mockHandleSubmit}
        handleInputChange={mockHandleInputChange}
        isLoading={false}
        invalidSubmit={false}
        setActiveTab={mockSetActiveTab}
      />
    );

    const tokenInput = screen.getByPlaceholderText("Enter your Token");
    fireEvent.change(tokenInput, { target: { value: "123456" } });
    expect(mockHandleInputChange).toHaveBeenCalledTimes(1);
    const pswInput = screen.getByPlaceholderText("Create a new password");
    fireEvent.change(tokenInput, { target: { value: "test123" } });
    expect(mockHandleInputChange).toHaveBeenCalledTimes(2);
    const pswcfmInput = screen.getByPlaceholderText("Confirm your new password");
    fireEvent.change(tokenInput, { target: { value: "test123" } });
    expect(mockHandleInputChange).toHaveBeenCalledTimes(3);
  });

  it("calls handleSubmit when reset form is submitted", () => {
    const { container } = render(
      <Reset
        formData={{ email: "test@email.com", otp: "123456", password: "test123", confirmPassword: "test123" }}
        handleSubmit={mockHandleSubmit}
        handleInputChange={mockHandleInputChange}
        isLoading={false}
        invalidSubmit={false}
        setActiveTab={mockSetActiveTab}
      />
    );

    const form = container.querySelector("form");
    fireEvent.submit(form);

    expect(mockHandleSubmit).toHaveBeenCalled();
  });
});