import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { MemoryRouter } from "react-router-dom";
import Login from "../pages/Login.jsx";
import Log from "../components/AuthForm/Log.jsx";
import Reg from "../components/AuthForm/Reg.jsx";

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

  it("renders register form when clicking switch tab button", () => {
    render(
      <MemoryRouter>
        <Login setIsLoggedIn={vi.fn()} />
      </MemoryRouter>
    );

    const registerTabButton = screen.getByText("Register");
    fireEvent.click(registerTabButton);

    expect(screen.getByRole("button", { name: "Create Account" })).toBeInTheDocument();
    expect(screen.getByPlaceholderText("First name")).toBeInTheDocument();
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
});

describe("Log component", () => {
  const mockHandleSubmit = vi.fn((e) => e.preventDefault());
  const mockHandleInputChange = vi.fn();
  const mockSetActiveTab = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
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
        formData={{ email: "test@email.com", password: "password123" }}
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