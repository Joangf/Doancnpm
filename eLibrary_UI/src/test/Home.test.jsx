import { render, screen, fireEvent, waitFor , within } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

import { MemoryRouter } from "react-router-dom";
import Home from "../pages/Home.jsx";
import Navbar from "../components/Home/Navbar.jsx";
import CategoryBar from "../components/Home/CategoryBar.jsx";
import BookSlider from "../components/Book/BookSlider.jsx";
import BookGrid from "../components/Book/BookGrid.jsx";

describe("Navbar component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("navbar when not logged in", () => {
    render(
      <MemoryRouter>
        <Navbar isLoggedIn={false} setIsLoggedIn={vi.fn()} activeCategories={[]}/>
      </MemoryRouter>
    );
    
    expect(screen.getByText("Login")).toBeInTheDocument();
  });

  it("navbar when logged in", () => {
    render(
      <MemoryRouter>
        <Navbar isLoggedIn={true} setIsLoggedIn={vi.fn()} activeCategories={[]}/>
      </MemoryRouter>
    );
    
    expect(screen.getByRole("img", { name: "Profile" })).toBeInTheDocument();
  });

  it("click logo to navigate home", () => {
    const {container} = render(
      <MemoryRouter>
        <Navbar isLoggedIn={true} setIsLoggedIn={vi.fn()} activeCategories={[]}/>
      </MemoryRouter>
    );

    const logoSection = container.querySelector(".logo-section");
    expect(logoSection).toBeInTheDocument();
    fireEvent.click(logoSection);

    expect(mockNavigate).toHaveBeenCalledWith("/");
  });

  it("click profile button to navigate profile", () => {
    const {container} = render(
      <MemoryRouter>
        <Navbar isLoggedIn={true} setIsLoggedIn={vi.fn()} activeCategories={[]}/>
      </MemoryRouter>
    );

    const profileSection = container.querySelector(".profile-section");
    expect(profileSection).toBeInTheDocument();
    fireEvent.click(profileSection);
    const profileButton = screen.getByText("Profile");
    fireEvent.click(profileButton);

    expect(mockNavigate).toHaveBeenCalledWith("/profile");
  });

  it("click logout button", async () => {
    global.fetch = vi.fn().mockResolvedValue({ ok: true, json: async () => ({}) });
    const mockSetIsLoggedIn = vi.fn();

    const {container} = render(
      <MemoryRouter>
        <Navbar isLoggedIn={true} setIsLoggedIn={mockSetIsLoggedIn} activeCategories={[]}/>
      </MemoryRouter>
    );

    const profileSection = container.querySelector(".profile-section");
    expect(profileSection).toBeInTheDocument();
    fireEvent.click(profileSection);
    const profileButton = screen.getByText("Logout");
    fireEvent.click(profileButton);

    await waitFor(() => {
      expect(mockSetIsLoggedIn).toHaveBeenCalledWith(false);
      expect(mockNavigate).toHaveBeenCalledWith("/");
    });
    global.fetch = undefined;
  });

  it("search books posts correct request, show result and navigate to result", async () => {
    const mockResponse = {
      result: {
        content: [
          { id: 10, title: "The Adventures of Sherlock Holmes", author: "Arthur Conan Doyle" }
        ]
      }
    };

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockResponse
    });

    render(
      <MemoryRouter>
        <Navbar isLoggedIn={false} setIsLoggedIn={vi.fn()} activeCategories={[{ id: 1 }]} />
      </MemoryRouter>
    );

    const input = screen.getByPlaceholderText("Search...");
    fireEvent.change(input, { target: { value: "Sherlock" } });

    const titleNode = await screen.findByText("The Adventures of Sherlock Holmes");
    expect(titleNode).toBeInTheDocument();
    expect(screen.getByText("by Arthur Conan Doyle")).toBeInTheDocument();

    expect(global.fetch).toHaveBeenCalled();
    const [calledUrl, options] = global.fetch.mock.calls[0];
    expect(calledUrl).toContain("/book/search");
    const body = JSON.parse(options.body);
    expect(body.keyword).toBe("Sherlock");
    expect(body.categoryIds).toEqual([1]);
    
    fireEvent.click(titleNode);
    expect(mockNavigate).toHaveBeenCalledWith("/book/10");
    global.fetch = undefined;
  });
});

describe("Category Bar component" , () => {
  it("category bar when there are no category", () => {
    render(
      <MemoryRouter> 
        <CategoryBar categories={[]} activeCategories={[]} setActiveCategory={vi.fn()}/>
      </MemoryRouter>
    );

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it ("category bar when there are categories", () => {
    const categories = [{id: 0, name: 'All'}, {id: 1, name: 'Action'}, {id: 2, name: 'Fantasy'}, {id: 3, name: 'Romance'}];
    render(
      <MemoryRouter> 
        <CategoryBar categories={categories} activeCategories={[{id: 0, name: 'All'}]} setActiveCategory={vi.fn()}/>
      </MemoryRouter>
    );

    expect(screen.getByText("All")).toBeInTheDocument();
    expect(screen.getByText("Action")).toBeInTheDocument();
    expect(screen.getByText("Fantasy")).toBeInTheDocument();
    expect(screen.getByText("Romance")).toBeInTheDocument();
  });

  it ("active category button have active class", () => {
    const categories = [{id: 0, name: 'All'}, {id: 1, name: 'Action'}, {id: 2, name: 'Fantasy'}, {id: 3, name: 'Romance'}];
    render(
      <MemoryRouter> 
        <CategoryBar categories={categories} activeCategories={[{id: 1, name: 'Action'}, {id: 2, name: 'Fantasy'}]} setActiveCategory={vi.fn()}/>
      </MemoryRouter>
    );

    expect(screen.getByText("Action")).toHaveClass("active");
    expect(screen.getByText("Fantasy")).toHaveClass("active")
  })

  it ("calls setActiveCategory when category clicked", () => {
    const categories = [{id: 0, name: 'All'}, {id: 1, name: 'Action'}, {id: 2, name: 'Fantasy'}, {id: 3, name: 'Romance'}];
    const mockSetActiveCategory = vi.fn();
    render(
      <MemoryRouter> 
        <CategoryBar categories={categories} activeCategories={[{id: 0, name: 'All'}]} setActiveCategory={mockSetActiveCategory}/>
      </MemoryRouter>
    );

    const actionBtn = screen.getByText("Action");
    fireEvent.click(actionBtn);
    
    expect(mockSetActiveCategory).toHaveBeenCalled();
  });

  it("calls setActiveCategory when 'All' category clicked", () => {
    const categories = [{id: 0, name: 'All'}, {id: 1, name: 'Action'}, {id: 2, name: 'Fantasy'}, {id: 3, name: 'Romance'}];
    const mockSetActiveCategory = vi.fn();
    render(
      <MemoryRouter>
        <CategoryBar categories={categories} activeCategories={[{ id: 1, name: "Action" }]} setActiveCategory={mockSetActiveCategory} />
      </MemoryRouter>
    );

    const allBtn = screen.getByText("All");
    fireEvent.click(allBtn);
    expect(mockSetActiveCategory).toHaveBeenCalledWith([categories[0]]);
  });
});

describe("Book Slider component" , () => {
  const books = [
  {
    "id": 1,
    "title": "Harry Potter và Hòn đá Phù thủy",
    "author": "J.K. Rowling",
    "description": "abc",
    "coverUrl": "https://raw.githubusercontent.com/Joangf/bookscover/refs/heads/main/Harry_Potter_va_hon_da_phu_thuy.jpg",
    "categories": [{ id: 1, name: "Phép thuật" }, { id: 2, name: "Phiêu lưu" }, { id: 3, name: "Kỳ ảo" }, { id: 4, name: "Thiếu nhi" }]
  },
  {
    "id": 2,
    "title": "Harry Potter và Phòng chứa Bí mật",
    "author": "J.K. Rowling",
    "description": "abc",
    "coverUrl": "https://raw.githubusercontent.com/Joangf/bookscover/refs/heads/main/Harry_Potter_va_phong_chua_bi_mat.jpg",
    "categories": [{ id: 1, name: "Phép thuật" }, { id: 2, name: "Phiêu lưu" }, { id: 3, name: "Kỳ ảo" }, { id: 4, name: "Thiếu nhi" }]
  }];

  it("loading state", () => {
    const {container} = render(
      <MemoryRouter>
        <BookSlider books={[]} isLoading = {true}/>
      </MemoryRouter>
    );

    expect(container.querySelector(".skeleton-loader")).toBeInTheDocument();
  });

  it("loaded state", () => {
    render(
      <MemoryRouter>
        <BookSlider books={books} isLoading={false}/>
      </MemoryRouter>
    );

    expect(screen.getByText("Harry Potter và Hòn đá Phù thủy")).toBeInTheDocument();
    expect(screen.getByText("Harry Potter và Phòng chứa Bí mật")).toBeInTheDocument();
  });

  it("click book and navigate to correct book", () => {
    render(
      <MemoryRouter>
        <BookSlider books={books} isLoading={false}/>
      </MemoryRouter>
    );

    const firstBook = screen.getAllByText("View Details")[0];
    fireEvent.click(firstBook);

    expect(mockNavigate).toHaveBeenCalledWith("/book/1");
  });
});

describe("Book Grid component" , () => {
  const books = [
  {
    "id": 1,
    "title": "Harry Potter và Hòn đá Phù thủy",
    "author": "J.K. Rowling",
    "description": "abc",
    "coverUrl": "https://raw.githubusercontent.com/Joangf/bookscover/refs/heads/main/Harry_Potter_va_hon_da_phu_thuy.jpg",
    "categories": [{ id: 1, name: "Phép thuật" }, { id: 2, name: "Phiêu lưu" }, { id: 3, name: "Kỳ ảo" }, { id: 4, name: "Thiếu nhi" }]
  },
  {
    "id": 2,
    "title": "Harry Potter và Phòng chứa Bí mật",
    "author": "J.K. Rowling",
    "description": "abc",
    "coverUrl": "https://raw.githubusercontent.com/Joangf/bookscover/refs/heads/main/Harry_Potter_va_phong_chua_bi_mat.jpg",
    "categories": [{ id: 1, name: "Phép thuật" }, { id: 2, name: "Phiêu lưu" }, { id: 3, name: "Kỳ ảo" }, { id: 4, name: "Thiếu nhi" }]
  }];

  it("loading state", () => {
    const {container} = render(
      <MemoryRouter>
        <BookGrid books={[]} isLoading={true}/>
      </MemoryRouter>
    );

    expect(container.querySelector(".skeleton-loader")).toBeInTheDocument();
  });

  it("loaded state", () => {
    render(
      <MemoryRouter>
        <BookGrid books={books}/>
      </MemoryRouter>
    );

    expect(screen.getByText("Harry Potter và Hòn đá Phù thủy")).toBeInTheDocument();
    expect(screen.getByText("Harry Potter và Phòng chứa Bí mật")).toBeInTheDocument();
  });

  it("click book and navigate to correct book", () => {
    render(
      <MemoryRouter>
        <BookGrid books={books}/>
      </MemoryRouter>
    );

    const firstBook = screen.getByTitle("Harry Potter và Hòn đá Phù thủy by J.K. Rowling");
    fireEvent.click(firstBook);

    expect(mockNavigate).toHaveBeenCalledWith("/book/1");
  });
});

describe("Home component" , () => {
  const books = [
  {
    "id": 1,
    "title": "Harry Potter và Hòn đá Phù thủy",
    "author": "J.K. Rowling",
    "description": "abc",
    "coverUrl": "https://raw.githubusercontent.com/Joangf/bookscover/refs/heads/main/Harry_Potter_va_hon_da_phu_thuy.jpg",
    "categories": [{ id: 1, name: "Phép thuật" }, { id: 2, name: "Phiêu lưu" }]
  },
  {
    "id": 2,
    "title": "Harry Potter và Phòng chứa Bí mật",
    "author": "J.K. Rowling",
    "description": "abc",
    "coverUrl": "https://raw.githubusercontent.com/Joangf/bookscover/refs/heads/main/Harry_Potter_va_phong_chua_bi_mat.jpg",
    "categories": [{ id: 1, name: "Phép thuật" }, { id: 2, name: "Phiêu lưu" }, { id: 3, name: "Kỳ ảo" }, { id: 4, name: "Thiếu nhi" }]
  }];
  
  it("clicking a category triggers a new fetch with that category id", async () => {
    const categoriesResp = { result: [{ id: 1, name: "Phép thuật" }, { id: 2, name: "Phiêu lưu" }, { id: 3, name: "Kỳ ảo" }, { id: 4, name: "Thiếu nhi" }]};
    const firstBooksResp = { result: { content: books, last: false } };
    const secondBooksResp = { result: { content: [books[1]], last: true } };

    global.fetch = vi
      .fn()
      .mockResolvedValueOnce({ ok: true, json: async () => categoriesResp })   // /category
      .mockResolvedValueOnce({ ok: true, json: async () => firstBooksResp })  // initial /book/filter
      .mockResolvedValueOnce({ ok: true, json: async () => secondBooksResp }); // after clicking a category

    const {container} = render(
      <MemoryRouter>
        <Home isLoggedIn={false} setIsLoggedIn={vi.fn()} />
      </MemoryRouter>
    );

    await screen.findByText("Kỳ ảo");
    const actionBtn = screen.getAllByText("Kỳ ảo")[0];
    fireEvent.click(actionBtn);

    const calls = global.fetch.mock.calls;
    const lastCall = calls[calls.length - 1];
    expect(lastCall[0]).toContain("/book/filter");
    const lastBody = JSON.parse(lastCall[1].body);
    expect(lastBody.categoryIds).toEqual([3]);

    const bookGrid = container.querySelector('.book-grid-content');
    const matches = await within(bookGrid).findAllByText("Harry Potter và Phòng chứa Bí mật");
    expect(matches.length).toBeGreaterThan(0);
    global.fetch = undefined;
  });
});
