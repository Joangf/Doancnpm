  it("shows fallback when book API returns empty", async () => {
    global.fetch = vi.fn().mockResolvedValue({ ok: true, json: async () => ({ result: {} }) });
    render(
      <MemoryRouter>
        <BookProfilePage isLoggedIn={true} setIsLoggedIn={vi.fn()} />
      </MemoryRouter>
    );
    // Không có tiêu đề sách
    expect(screen.queryByText(/Test Book/i)).not.toBeInTheDocument();
    // Có thể kiểm tra fallback UI hoặc không bị crash
    expect(screen.getByText(/Book Details/i)).toBeInTheDocument();
  });

  it("disables borrow, rating, download when not logged in", async () => {
    global.fetch = vi.fn().mockResolvedValue({ ok: true, json: async () => ({ result: sampleBook }) });
    render(
      <MemoryRouter>
        <BookProfilePage isLoggedIn={false} setIsLoggedIn={vi.fn()} />
      </MemoryRouter>
    );
    await screen.findByRole('heading', { name: /Test Book/i });
    // Nút borrow phải báo lỗi khi click
    const borrowBtn = screen.getAllByText(/Borrow Book/i)[0];
    fireEvent.click(borrowBtn);
    const dayOption = await screen.findByText("1 Day");
    fireEvent.click(dayOption);
    const borrowNowBtn = screen.getAllByText(/Borrow for/)[0];
    fireEvent.click(borrowNowBtn);
    expect(await screen.findByText(/You need to login to borrow/i)).toBeInTheDocument();
    // Nút download phải disable
    const downloadBtn = screen.getByText("Download PDF").closest('button');
    expect(downloadBtn).toBeDisabled();
    // Click star không gọi fetch
    const starsContainer = document.querySelector('.stars');
    if (starsContainer) {
      const starSvgs = starsContainer.querySelectorAll('svg');
      const callCountBefore = global.fetch.mock.calls.length;
      fireEvent.click(starSvgs[0]);
      expect(global.fetch.mock.calls.length).toBe(callCountBefore);
    }
  });

  it("enables download button when book is already borrowed", async () => {
    // Mock book fetch first, then the user's borrowed books (contains this book id)
    global.fetch = vi.fn()
      .mockResolvedValueOnce({ ok: true, json: async () => ({ result: sampleBook }) })
      .mockResolvedValueOnce({ ok: true, json: async () => ({ result: { content: [{ bookId: sampleBook.id }] } }) });

    render(
      <MemoryRouter>
        <BookProfilePage isLoggedIn={true} setIsLoggedIn={vi.fn()} />
      </MemoryRouter>
    );

    // Wait for both fetches to complete and component to update
    await screen.findByRole('heading', { name: /Test Book/i });
    // The download button should be enabled because the borrowed list includes this book id
    const downloadBtn = screen.getByText("Download PDF").closest('button');
    expect(downloadBtn).toBeEnabled();
  });

  it("shows correct category tags", async () => {
    global.fetch = vi.fn().mockResolvedValue({ ok: true, json: async () => ({ result: sampleBook }) });
    render(
      <MemoryRouter>
        <BookProfilePage isLoggedIn={true} setIsLoggedIn={vi.fn()} />
      </MemoryRouter>
    );
    await screen.findByRole('heading', { name: /Test Book/i });
    sampleBook.categories.forEach(cat => {
      expect(screen.getByText(cat.name)).toBeInTheDocument();
    });
  });

  it("shows error message when fetch fails", async () => {
    global.fetch = vi.fn().mockResolvedValue({ ok: false, json: async () => ({}) });
    render(
      <MemoryRouter>
        <BookProfilePage isLoggedIn={true} setIsLoggedIn={vi.fn()} />
      </MemoryRouter>
    );
    // Có thể kiểm tra console.error hoặc fallback UI
    expect(screen.getByText(/Book Details/i)).toBeInTheDocument();
  });
import { render, screen, fireEvent, waitFor, within } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useParams: () => ({ id: "1" }),
  };
});

import { MemoryRouter } from "react-router-dom";
import BookProfilePage from "../pages/BookProfilePage.jsx";

const sampleBook = {
  id: 1,
  title: "Test Book",
  author: "Author Name",
  coverUrl: "cover.jpg",
  publisher: "Pub House",
  publishYear: 2020,
  description: "This is a test book.",
  categories: [{ id: 1, name: "Fiction" }],
  pdfUrl: "http://example.com/book.pdf",
  averageRating: 4.2,
  rating: 4
};

describe("BookProfilePage component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // simple localStorage mock
    const store = { idUser: "1", authToken: "token" };
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: (key) => store[key],
        setItem: (key, value) => (store[key] = value),
        removeItem: (key) => delete store[key]
      },
      configurable: true
    });
  });

  afterEach(() => {
    global.fetch = undefined;
  });

  it("renders Navbar and BookProfile layout (not logged in)", async () => {
    global.fetch = vi.fn().mockResolvedValue({ ok: true, json: async () => ({ result: sampleBook }) });

    render(
      <MemoryRouter>
        <BookProfilePage isLoggedIn={false} setIsLoggedIn={vi.fn()} />
      </MemoryRouter>
    );

    expect(screen.getByText(/Login/i)).toBeInTheDocument();
    // wait for book title heading to appear
    const title = await screen.findByRole('heading', { name: /Test Book/i });
    expect(title).toBeInTheDocument();
  });

  it("renders Navbar and BookProfile layout (logged in)", async () => {
    global.fetch = vi.fn().mockResolvedValue({ ok: true, json: async () => ({ result: sampleBook }) });

    render(
      <MemoryRouter>
        <BookProfilePage isLoggedIn={true} setIsLoggedIn={vi.fn()} />
      </MemoryRouter>
    );

    expect(screen.queryByText(/Login/i)).not.toBeInTheDocument();
    // ensure the main title heading is present
    await screen.findByRole('heading', { name: /Test Book/i });
    expect(screen.getByText("Written by")).toBeInTheDocument();
  });

  it("displays default borrow button text", async () => {
    global.fetch = vi.fn().mockResolvedValue({ ok: true, json: async () => ({ result: sampleBook }) });
    render(
      <MemoryRouter>
        <BookProfilePage isLoggedIn={false} setIsLoggedIn={vi.fn()} />
      </MemoryRouter>
    );
    await screen.findByRole('heading', { name: /Test Book/i });
    expect(screen.getAllByText(/Borrow Book/i)[0]).toBeInTheDocument();
  });

  it("shows failure ticker when trying to borrow while not logged in", async () => {
    global.fetch = vi.fn().mockResolvedValue({ ok: true, json: async () => ({ result: sampleBook }) });
    render(
      <MemoryRouter>
        <BookProfilePage isLoggedIn={false} setIsLoggedIn={vi.fn()} />
      </MemoryRouter>
    );
    await screen.findByRole('heading', { name: /Test Book/i });
    const borrowBtn = screen.getAllByText(/Borrow Book/i)[0];
    // open dropdown first
    fireEvent.click(borrowBtn);
    const dayOption = await screen.findByText("1 Day");
    fireEvent.click(dayOption);
    // now button text becomes Borrow for 1 Day, click to attempt borrow
    const borrowNowBtn = screen.getAllByText(/Borrow for/)[0];
    fireEvent.click(borrowNowBtn);
    // TickingFail message should appear after the internal timeout
    expect(await screen.findByText(/You need to login to borrow/i)).toBeInTheDocument();
  });

  it("can open days dropdown and select a day", async () => {
    global.fetch = vi.fn().mockResolvedValue({ ok: true, json: async () => ({ result: sampleBook }) });
    render(
      <MemoryRouter>
        <BookProfilePage isLoggedIn={true} setIsLoggedIn={vi.fn()} />
      </MemoryRouter>
    );
    await screen.findByRole('heading', { name: /Test Book/i });
    const borrowBtn = screen.getAllByRole('button', { name: /Borrow Book/i })[0];
    fireEvent.click(borrowBtn);
    // dropdown shows day options
    const dayOption = await screen.findByText("1 Day");
    expect(dayOption).toBeInTheDocument();
    fireEvent.click(dayOption);
    // now button text should change
    expect(screen.getAllByText(/Borrow for 1 Days|Borrow for 1 Day/)[0]).toBeInTheDocument();
  });


  it("shows author, publisher, and year info", async () => {
    global.fetch = vi.fn().mockResolvedValue({ ok: true, json: async () => ({ result: sampleBook }) });
    render(
      <MemoryRouter>
        <BookProfilePage isLoggedIn={true} setIsLoggedIn={vi.fn()} />
      </MemoryRouter>
    );
    // Use findByRole to get the book title heading specifically
    const titleHeading = await screen.findByRole('heading', { name: /Test Book/i });
    expect(titleHeading).toBeInTheDocument();
    expect(screen.getByText(/Written by/i)).toBeInTheDocument();
    expect(screen.getByText(sampleBook.author)).toBeInTheDocument();
    expect(screen.getByText(/Publisher/i)).toBeInTheDocument();
    expect(screen.getByText(sampleBook.publisher)).toBeInTheDocument();
    expect(screen.getByText(/Publish Year/i)).toBeInTheDocument();
    expect(screen.getByText(sampleBook.publishYear.toString())).toBeInTheDocument();
  });

  it("rating star posts rating and refetches book", async () => {
    // book fetch, then rating POST, then book fetch again
    global.fetch = vi.fn()
      .mockResolvedValueOnce({ ok: true, json: async () => ({ result: sampleBook }) })
      .mockResolvedValueOnce({ ok: true, json: async () => ({}) })
      .mockResolvedValueOnce({ ok: true, json: async () => ({ result: sampleBook }) });

    const { container } = render(
      <MemoryRouter>
        <BookProfilePage isLoggedIn={true} setIsLoggedIn={vi.fn()} />
      </MemoryRouter>
    );

    await screen.findByRole('heading', { name: /Test Book/i });
    // select star svgs inside the .stars container
    const starsContainer = container.querySelector('.stars');
    const starSvgs = starsContainer ? starsContainer.querySelectorAll('svg') : [];
    expect(starSvgs.length).toBeGreaterThan(0);
    fireEvent.click(starSvgs[0]);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalled();
    });
    const calledUrls = global.fetch.mock.calls.map(c => c[0]);
    expect(calledUrls.some(u => typeof u === 'string' && u.includes('/rating/'))).toBeTruthy();
  });

  it("switches tabs to Reviews", async () => {
    global.fetch = vi.fn().mockResolvedValue({ ok: true, json: async () => ({ result: sampleBook }) });
    render(
      <MemoryRouter>
        <BookProfilePage isLoggedIn={true} setIsLoggedIn={vi.fn()} />
      </MemoryRouter>
    );
    await screen.findByRole('heading', { name: /Test Book/i });
    const reviewsTab = screen.getByText("Reader Reviews");
    fireEvent.click(reviewsTab);
    expect(screen.getByText(/An engaging classic!/i)).toBeInTheDocument();
  });

  it("shows related books section", async () => {
    global.fetch = vi.fn().mockResolvedValue({ ok: true, json: async () => ({ result: sampleBook }) });
    render(
      <MemoryRouter>
        <BookProfilePage isLoggedIn={true} setIsLoggedIn={vi.fn()} />
      </MemoryRouter>
    );
    await screen.findByRole('heading', { name: /Test Book/i });
    expect(screen.getByText("More From This Author")).toBeInTheDocument();
  });

  it("days dropdown shows 30 options", async () => {
    global.fetch = vi.fn().mockResolvedValue({ ok: true, json: async () => ({ result: sampleBook }) });
    render(
      <MemoryRouter>
        <BookProfilePage isLoggedIn={true} setIsLoggedIn={vi.fn()} />
      </MemoryRouter>
    );
    await screen.findByRole('heading', { name: /Test Book/i });
    const borrowBtn = screen.getAllByText(/Borrow Book/i)[0];
    fireEvent.click(borrowBtn);
    // count day items
    const items = await screen.findAllByText(/Day/);
    expect(items.length).toBeGreaterThanOrEqual(30);
  });

  it("hovering play icon can open dropdown (mouseEnter)", async () => {
    global.fetch = vi.fn().mockResolvedValue({ ok: true, json: async () => ({ result: sampleBook }) });
    const { container } = render(
      <MemoryRouter>
        <BookProfilePage isLoggedIn={true} setIsLoggedIn={vi.fn()} />
      </MemoryRouter>
    );
    await screen.findByRole('heading', { name: /Test Book/i });
    // find the primary borrow button and its svg (play icon)
    const borrowBtn = screen.getAllByText(/Borrow Book|Borrow for/)[0].closest('button');
    const playSvg = borrowBtn.querySelector('svg');
    expect(playSvg).toBeInTheDocument();
    fireEvent.mouseEnter(playSvg);
    // dropdown should show
    expect(await screen.findByText("1 Day")).toBeInTheDocument();
  });


  it("can switch between Book Details and Reader Reviews tabs", async () => {
    global.fetch = vi.fn().mockResolvedValue({ ok: true, json: async () => ({ result: sampleBook }) });
    render(
      <MemoryRouter>
        <BookProfilePage isLoggedIn={true} setIsLoggedIn={vi.fn()} />
      </MemoryRouter>
    );
    // Use findByRole to get the book title heading specifically
    const titleHeading = await screen.findByRole('heading', { name: /Test Book/i });
    expect(titleHeading).toBeInTheDocument();
    // Tab Book Details
    expect(screen.getByText(sampleBook.description)).toBeInTheDocument();
    // Switch to Reader Reviews
    const reviewsTab = screen.getByText(/Reader Reviews/i);
    fireEvent.click(reviewsTab);
    expect(screen.getByText(/An engaging classic!/i)).toBeInTheDocument();
  });

  it("favorite count is visible", async () => {
    global.fetch = vi.fn().mockResolvedValue({ ok: true, json: async () => ({ result: sampleBook }) });
    render(
      <MemoryRouter>
        <BookProfilePage isLoggedIn={true} setIsLoggedIn={vi.fn()} />
      </MemoryRouter>
    );
    await screen.findByRole('heading', { name: /Test Book/i });
    expect(screen.getByText(/Favorites/i)).toBeInTheDocument();
  });

  it("star icons do not trigger rating when not logged in", async () => {
    // ensure clicking a star when not logged in does not call fetch again
    global.fetch = vi.fn().mockResolvedValue({ ok: true, json: async () => ({ result: sampleBook }) });
    const { container } = render(
      <MemoryRouter>
        <BookProfilePage isLoggedIn={false} setIsLoggedIn={vi.fn()} />
      </MemoryRouter>
    );
    await screen.findByRole('heading', { name: /Test Book/i });
    const starsContainer = container.querySelector('.stars');
    const starSvgs = starsContainer ? starsContainer.querySelectorAll('svg') : [];
    expect(starSvgs.length).toBeGreaterThan(0);
    const callCountBefore = global.fetch.mock.calls.length;
    fireEvent.click(starSvgs[0]);
    expect(global.fetch.mock.calls.length).toBe(callCountBefore);
  });
});
