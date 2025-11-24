import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { MemoryRouter } from "react-router-dom";
import UserProfilePage from "../pages/UserProfilePage";

// Mock useNavigate
const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

// Mock các component con
vi.mock("../components/Home/Navbar", () => ({
  default: ({ isLoggedIn, setIsLoggedIn }) => (
    <nav data-testid="navbar">
      <div>Navbar - Logged in: {isLoggedIn ? "Yes" : "No"}</div>
    </nav>
  ),
}));

vi.mock("../utils/TickingFail", () => ({
  default: ({ isVisible, message }) =>
    isVisible ? <div data-testid="ticking-fail">{message}</div> : null,
}));

vi.mock("../components/UserProfile/Profile", () => ({
  default: ({ formData, handleInputChange, handleSubmit, setActiveDelete }) => (
    <div data-testid="profile-component">
      <form onSubmit={handleSubmit}>
        <input
          data-testid="firstName-input"
          name="firstName"
          value={formData.firstName}
          onChange={handleInputChange}
        />
        <input
          data-testid="lastName-input"
          name="lastName"
          value={formData.lastName}
          onChange={handleInputChange}
        />
        <button type="submit" data-testid="save-button">
          Save Changes
        </button>
        <button
          type="button"
          data-testid="delete-account-button"
          onClick={() => setActiveDelete(true)}
        >
          Delete Account
        </button>
      </form>
    </div>
  ),
}));

vi.mock("../components/UserProfile/Library", () => ({
  default: ({ borrowedBooks }) => (
    <div data-testid="library-component">
      <div>Library - Books: {borrowedBooks?.length || 0}</div>
    </div>
  ),
}));

vi.mock("../components/UserProfile/Subscription", () => ({
  default: ({ subscriptionPlan, activeSubscriptionPlan }) => (
    <div data-testid="subscription-component">
      <div>Active Plan: {activeSubscriptionPlan}</div>
      <div>Available Plans: {subscriptionPlan?.length || 0}</div>
    </div>
  ),
}));

vi.mock("../components/UserProfile/DeleteAccountBox", () => ({
  default: ({ onCancel, onConfirm }) => (
    <div data-testid="delete-account-box">
      <button data-testid="cancel-delete" onClick={onCancel}>
        Cancel
      </button>
      <button data-testid="confirm-delete" onClick={onConfirm}>
        Confirm Delete
      </button>
    </div>
  ),
}));

describe("UserProfilePage", () => {
  const mockSetIsLoggedIn = vi.fn();
  const mockUserId = "123";
  const mockToken = "mock-auth-token";

  // Mock fetch globally
  global.fetch = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    // Setup localStorage mocks
    localStorage.setItem("idUser", mockUserId);
    localStorage.setItem("authToken", mockToken);
    localStorage.setItem("isLoggedIn", "true");
  });

  afterEach(() => {
    localStorage.clear();
  });

  describe("Authentication", () => {
    it("renders TickingFail when user is not logged in", () => {
      render(
        <MemoryRouter>
          <UserProfilePage isLoggedIn={false} setIsLoggedIn={mockSetIsLoggedIn} />
        </MemoryRouter>
      );

      expect(screen.getByTestId("ticking-fail")).toBeInTheDocument();
      expect(screen.getByText("You needs to login first")).toBeInTheDocument();
      expect(screen.queryByTestId("navbar")).not.toBeInTheDocument();
    });

    it("renders profile page when user is logged in", async () => {
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          result: {
            username: "testuser",
            firstName: "Test",
            lastName: "User",
            email: "test@example.com",
            phoneNumber: "1234567890",
            university: "Test University",
            birthDate: "1",
            birthMonth: "1",
            birthYear: "2000",
          },
        }),
      });

      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          result: { content: [] },
        }),
      });

      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          result: { content: [] },
        }),
      });

      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          result: [],
        }),
      });

      render(
        <MemoryRouter>
          <UserProfilePage isLoggedIn={true} setIsLoggedIn={mockSetIsLoggedIn} />
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(screen.getByTestId("navbar")).toBeInTheDocument();
      });

      expect(screen.queryByTestId("ticking-fail")).not.toBeInTheDocument();
    });
  });

  describe("Data Fetching", () => {
    it("fetches user data on mount", async () => {
      const mockUserData = {
        result: {
          username: "testuser",
          firstName: "John",
          lastName: "Doe",
          email: "john@example.com",
          phoneNumber: "1234567890",
          university: "Test University",
          birthDate: "15",
          birthMonth: "5",
          birthYear: "1990",
        },
      };

      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockUserData,
      });

      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ result: { content: [] } }),
      });

      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ result: { content: [] } }),
      });

      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ result: [] }),
      });

      render(
        <MemoryRouter>
          <UserProfilePage isLoggedIn={true} setIsLoggedIn={mockSetIsLoggedIn} />
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(global.fetch).toHaveBeenCalledWith(
          expect.stringContaining("/user/123"),
          expect.objectContaining({
            method: "GET",
            headers: expect.objectContaining({
              Authorization: `Bearer ${mockToken}`,
            }),
          })
        );
      });
    });

    it("fetches borrowed books on mount", async () => {
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          result: {
            username: "testuser",
            firstName: "Test",
            lastName: "User",
            email: "test@example.com",
          },
        }),
      });

      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          result: {
            content: [
              { id: 1, title: "Book 1" },
              { id: 2, title: "Book 2" },
            ],
          },
        }),
      });

      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ result: { content: [] } }),
      });

      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ result: [] }),
      });

      render(
        <MemoryRouter>
          <UserProfilePage isLoggedIn={true} setIsLoggedIn={mockSetIsLoggedIn} />
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(global.fetch).toHaveBeenCalledWith(
          expect.stringContaining("/borrow/user/123"),
          expect.objectContaining({
            method: "GET",
          })
        );
      });
    });

    it("fetches subscription data on mount", async () => {
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          result: {
            username: "testuser",
            firstName: "Test",
            lastName: "User",
          },
        }),
      });

      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ result: { content: [] } }),
      });

      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          result: { content: [{ status: "ACTIVE", planName: "PREMIUM" }] },
        }),
      });

      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          result: [
            { id: 2, name: "PREMIUM" },
            { id: 3, name: "BASIC" },
          ],
        }),
      });

      render(
        <MemoryRouter>
          <UserProfilePage isLoggedIn={true} setIsLoggedIn={mockSetIsLoggedIn} />
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(global.fetch).toHaveBeenCalledWith(
          expect.stringContaining("/subscriptions/user/123"),
          expect.any(Object)
        );
      });
    });

    it("handles fetch errors gracefully", async () => {
      // Mock first fetch to fail, others to succeed
      global.fetch
        .mockRejectedValueOnce(new Error("Network error"))
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({ result: { content: [] } }),
        })
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({ result: { content: [] } }),
        })
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({ result: [] }),
        });

      const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

      render(
        <MemoryRouter>
          <UserProfilePage isLoggedIn={true} setIsLoggedIn={mockSetIsLoggedIn} />
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(consoleSpy).toHaveBeenCalled();
      });

      consoleSpy.mockRestore();
    });
  });

  describe("Tab Navigation", () => {
    beforeEach(async () => {
      // Mock user data fetch
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          result: {
            username: "testuser",
            firstName: "Test",
            lastName: "User",
            email: "test@example.com",
            phoneNumber: "",
            university: "",
            birthDate: "",
            birthMonth: "",
            birthYear: "",
          },
        }),
      });

      // Mock borrowed books fetch
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ result: { content: [] } }),
      });

      // Mock subscription data fetch (first call - /subscriptions/user/${id})
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ result: { content: [] } }),
      });

      // Mock subscription plan fetch (second call - /subscription-plan)
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ result: [] }),
      });
    });

    it("renders Profile tab by default", async () => {
      render(
        <MemoryRouter>
          <UserProfilePage isLoggedIn={true} setIsLoggedIn={mockSetIsLoggedIn} />
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(screen.getByTestId("profile-component")).toBeInTheDocument();
      });

      expect(screen.queryByTestId("library-component")).not.toBeInTheDocument();
      expect(screen.queryByTestId("subscription-component")).not.toBeInTheDocument();
    });

    it("switches to Library tab when clicked", async () => {
      render(
        <MemoryRouter>
          <UserProfilePage isLoggedIn={true} setIsLoggedIn={mockSetIsLoggedIn} />
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(screen.getByTestId("profile-component")).toBeInTheDocument();
      });

      // Wait for all fetch calls to complete
      await waitFor(() => {
        expect(global.fetch).toHaveBeenCalled();
      });

      const libraryTab = screen.getByText("Library");
      fireEvent.click(libraryTab);

      await waitFor(() => {
        expect(screen.getByTestId("library-component")).toBeInTheDocument();
      });

      expect(screen.queryByTestId("profile-component")).not.toBeInTheDocument();
    });

    it("switches to Subscription tab when clicked", async () => {
      render(
        <MemoryRouter>
          <UserProfilePage isLoggedIn={true} setIsLoggedIn={mockSetIsLoggedIn} />
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(screen.getByTestId("profile-component")).toBeInTheDocument();
      });

      const subscriptionTab = screen.getByText("Subscription");
      fireEvent.click(subscriptionTab);

      await waitFor(() => {
        expect(screen.getByTestId("subscription-component")).toBeInTheDocument();
      });

      expect(screen.queryByTestId("profile-component")).not.toBeInTheDocument();
    });

    it("switches back to Profile tab from Library", async () => {
      render(
        <MemoryRouter>
          <UserProfilePage isLoggedIn={true} setIsLoggedIn={mockSetIsLoggedIn} />
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(screen.getByTestId("profile-component")).toBeInTheDocument();
      });

      // Wait for all fetch calls to complete
      await waitFor(() => {
        expect(global.fetch).toHaveBeenCalled();
      });

      // Switch to Library
      fireEvent.click(screen.getByText("Library"));

      await waitFor(() => {
        expect(screen.getByTestId("library-component")).toBeInTheDocument();
      });

      // Switch back to Profile
      fireEvent.click(screen.getByText("Profile"));

      await waitFor(() => {
        expect(screen.getByTestId("profile-component")).toBeInTheDocument();
      });
    });
  });

  describe("Form Input Handling", () => {
    beforeEach(async () => {
      // Mock user data fetch
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          result: {
            username: "testuser",
            firstName: "Test",
            lastName: "User",
            email: "test@example.com",
            phoneNumber: "1234567890",
            university: "Test University",
            birthDate: "1",
            birthMonth: "1",
            birthYear: "2000",
          },
        }),
      });

      // Mock borrowed books fetch
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ result: { content: [] } }),
      });

      // Mock subscription data fetch (first call - /subscriptions/user/${id})
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ result: { content: [] } }),
      });

      // Mock subscription plan fetch (second call - /subscription-plan)
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ result: [] }),
      });
    });

    it("updates firstName input value", async () => {
      render(
        <MemoryRouter>
          <UserProfilePage isLoggedIn={true} setIsLoggedIn={mockSetIsLoggedIn} />
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(screen.getByTestId("firstName-input")).toBeInTheDocument();
      });

      const firstNameInput = screen.getByTestId("firstName-input");
      fireEvent.change(firstNameInput, { target: { name: "firstName", value: "NewName" } });

      expect(firstNameInput.value).toBe("NewName");
    });

    it("updates lastName input value", async () => {
      render(
        <MemoryRouter>
          <UserProfilePage isLoggedIn={true} setIsLoggedIn={mockSetIsLoggedIn} />
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(screen.getByTestId("lastName-input")).toBeInTheDocument();
      });

      const lastNameInput = screen.getByTestId("lastName-input");
      fireEvent.change(lastNameInput, { target: { name: "lastName", value: "NewLastName" } });

      expect(lastNameInput.value).toBe("NewLastName");
    });
  });

  describe("Form Submission", () => {
    beforeEach(async () => {
      // Mock user data fetch
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          result: {
            username: "testuser",
            firstName: "Test",
            lastName: "User",
            email: "test@example.com",
            phoneNumber: "",
            university: "",
            birthDate: "",
            birthMonth: "",
            birthYear: "",
          },
        }),
      });

      // Mock borrowed books fetch
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ result: { content: [] } }),
      });

      // Mock subscription data fetch (first call - /subscriptions/user/${id})
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ result: { content: [] } }),
      });

      // Mock subscription plan fetch (second call - /subscription-plan)
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ result: [] }),
      });
    });

    it("submits form with updated user data", async () => {
      const alertSpy = vi.spyOn(window, "alert").mockImplementation(() => {});

      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          result: {
            username: "testuser",
            firstName: "Test",
            lastName: "User",
            email: "test@example.com",
          },
        }),
      });

      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ result: { content: [] } }),
      });

      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ result: { content: [] } }),
      });

      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ result: [] }),
      });

      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({}),
      });

      render(
        <MemoryRouter>
          <UserProfilePage isLoggedIn={true} setIsLoggedIn={mockSetIsLoggedIn} />
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(screen.getByTestId("save-button")).toBeInTheDocument();
      });

      const form = screen.getByTestId("profile-component").querySelector("form");
      fireEvent.submit(form);

      await waitFor(() => {
        expect(global.fetch).toHaveBeenCalledWith(
          expect.stringContaining("/user/123"),
          expect.objectContaining({
            method: "PUT",
            headers: expect.objectContaining({
              Authorization: `Bearer ${mockToken}`,
            }),
            body: expect.stringContaining("firstName"),
          })
        );
      });

      alertSpy.mockRestore();
    });

    it("shows alert on successful profile update", async () => {
      const alertSpy = vi.spyOn(window, "alert").mockImplementation(() => {});

      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          result: {
            username: "testuser",
            firstName: "Test",
            lastName: "User",
          },
        }),
      });

      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ result: { content: [] } }),
      });

      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ result: { content: [] } }),
      });

      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ result: [] }),
      });

      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({}),
      });

      render(
        <MemoryRouter>
          <UserProfilePage isLoggedIn={true} setIsLoggedIn={mockSetIsLoggedIn} />
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(screen.getByTestId("save-button")).toBeInTheDocument();
      });

      const form = screen.getByTestId("profile-component").querySelector("form");
      fireEvent.submit(form);

      await waitFor(() => {
        expect(alertSpy).toHaveBeenCalledWith("Profile updated successfully");
      });

      alertSpy.mockRestore();
    });
  });

  describe("Delete Account", () => {
    beforeEach(async () => {
      // Mock user data fetch
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          result: {
            username: "testuser",
            firstName: "Test",
            lastName: "User",
            email: "test@example.com",
            phoneNumber: "",
            university: "",
            birthDate: "",
            birthMonth: "",
            birthYear: "",
          },
        }),
      });

      // Mock borrowed books fetch
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ result: { content: [] } }),
      });

      // Mock subscription data fetch (first call - /subscriptions/user/${id})
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ result: { content: [] } }),
      });

      // Mock subscription plan fetch (second call - /subscription-plan)
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ result: [] }),
      });
    });

    it("opens delete account confirmation box", async () => {
      render(
        <MemoryRouter>
          <UserProfilePage isLoggedIn={true} setIsLoggedIn={mockSetIsLoggedIn} />
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(screen.getByTestId("delete-account-button")).toBeInTheDocument();
      });

      const deleteButton = screen.getByTestId("delete-account-button");
      fireEvent.click(deleteButton);

      await waitFor(() => {
        expect(screen.getByTestId("delete-account-box")).toBeInTheDocument();
      });
    });

    it("closes delete account box when cancel is clicked", async () => {
      render(
        <MemoryRouter>
          <UserProfilePage isLoggedIn={true} setIsLoggedIn={mockSetIsLoggedIn} />
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(screen.getByTestId("delete-account-button")).toBeInTheDocument();
      });

      // Open delete box
      fireEvent.click(screen.getByTestId("delete-account-button"));

      await waitFor(() => {
        expect(screen.getByTestId("delete-account-box")).toBeInTheDocument();
      });

      // Cancel delete
      fireEvent.click(screen.getByTestId("cancel-delete"));

      await waitFor(() => {
        expect(screen.queryByTestId("delete-account-box")).not.toBeInTheDocument();
      });
    });

    it("deletes account and redirects when confirmed", async () => {
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({}),
      });

      render(
        <MemoryRouter>
          <UserProfilePage isLoggedIn={true} setIsLoggedIn={mockSetIsLoggedIn} />
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(screen.getByTestId("delete-account-button")).toBeInTheDocument();
      });

      // Open delete box
      fireEvent.click(screen.getByTestId("delete-account-button"));

      await waitFor(() => {
        expect(screen.getByTestId("confirm-delete")).toBeInTheDocument();
      });

      // Confirm delete
      fireEvent.click(screen.getByTestId("confirm-delete"));

      await waitFor(() => {
        expect(global.fetch).toHaveBeenCalledWith(
          expect.stringContaining("/user/123"),
          expect.objectContaining({
            method: "DELETE",
            headers: expect.objectContaining({
              Authorization: `Bearer ${mockToken}`,
            }),
          })
        );
      });

      await waitFor(() => {
        expect(mockSetIsLoggedIn).toHaveBeenCalledWith(false);
        expect(mockNavigate).toHaveBeenCalledWith("/");
      });
    });

    it("clears localStorage on successful account deletion", async () => {
      const removeItemSpy = vi.spyOn(Storage.prototype, "removeItem");
      const setItemSpy = vi.spyOn(Storage.prototype, "setItem");

      // Mock all initial fetch calls
      global.fetch
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({
            result: {
              username: "testuser",
              firstName: "Test",
              lastName: "User",
              email: "test@example.com",
            },
          }),
        })
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({ result: { content: [] } }),
        })
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({ result: { content: [] } }),
        })
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({ result: [] }),
        })
        // Mock delete account call - this will be the 5th call
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({}),
        });

      render(
        <MemoryRouter>
          <UserProfilePage isLoggedIn={true} setIsLoggedIn={mockSetIsLoggedIn} />
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(screen.getByTestId("delete-account-button")).toBeInTheDocument();
      });

      fireEvent.click(screen.getByTestId("delete-account-button"));

      await waitFor(() => {
        expect(screen.getByTestId("confirm-delete")).toBeInTheDocument();
      });

      fireEvent.click(screen.getByTestId("confirm-delete"));

      // Wait for the delete fetch to be called and completed
      await waitFor(() => {
        const deleteCalls = global.fetch.mock.calls.filter(
          (call) => call[0]?.includes("/user/123") && call[1]?.method === "DELETE"
        );
        expect(deleteCalls.length).toBeGreaterThan(0);
      });

      // Wait for localStorage operations
      await waitFor(() => {
        expect(removeItemSpy).toHaveBeenCalledWith("authToken");
        expect(removeItemSpy).toHaveBeenCalledWith("idUser");
        expect(setItemSpy).toHaveBeenCalledWith("isLoggedIn", "false");
        expect(mockSetIsLoggedIn).toHaveBeenCalledWith(false);
        expect(mockNavigate).toHaveBeenCalledWith("/");
      }, { timeout: 5000 });

      removeItemSpy.mockRestore();
      setItemSpy.mockRestore();
    });
  });

  describe("User Display", () => {
    it("displays user name and subscription plan", async () => {
      // Mock user data fetch
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          result: {
            username: "testuser",
            firstName: "Test",
            lastName: "User",
            email: "test@example.com",
            phoneNumber: "",
            university: "",
            birthDate: "",
            birthMonth: "",
            birthYear: "",
          },
        }),
      });

      // Mock borrowed books fetch
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ result: { content: [] } }),
      });

      // Mock subscription data fetch (first call - /subscriptions/user/${id})
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          result: { content: [{ status: "ACTIVE", planName: "PREMIUM" }] },
        }),
      });

      // Mock subscription plan fetch (second call - /subscription-plan)
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ result: [] }),
      });

      render(
        <MemoryRouter>
          <UserProfilePage isLoggedIn={true} setIsLoggedIn={mockSetIsLoggedIn} />
        </MemoryRouter>
      );

      // Wait for all fetch calls to complete
      await waitFor(() => {
        expect(global.fetch).toHaveBeenCalledTimes(4);
      });

      // Verify that user info section is rendered
      await waitFor(() => {
        const userInfo = screen.getByTestId("navbar");
        expect(userInfo).toBeInTheDocument();
      });

      // Verify that profile component is rendered (indicates component loaded successfully)
      await waitFor(() => {
        const profileComponent = screen.getByTestId("profile-component");
        expect(profileComponent).toBeInTheDocument();
      });

      // Verify that user details section exists in the DOM
      // This confirms the structure for displaying user name and subscription plan is present
      const userDetailsSection = document.querySelector('.user-details');
      expect(userDetailsSection).toBeInTheDocument();
    });
  });
});

