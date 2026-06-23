import { render, screen } from "@testing-library/react";
import Page from "@/app/page";

describe("Landing Page Integration", () => {
  it("renders the hero heading and description", () => {
    render(<Page />);

    const heroHeading = screen.getByRole("heading", { level: 1 });
    expect(heroHeading).toHaveTextContent(/sports legacy/i);

    expect(
      screen.getByText(/LockerRoom securely hosts, indexes, and streams/i)
    ).toBeInTheDocument();
  });

  it('renders "Explore the Vault" CTA buttons with links to /sign-up', () => {
    render(<Page />);

    const startButtons = screen.getAllByRole("button", {
      name: /explore the vault/i,
    });
    expect(startButtons.length).toBeGreaterThanOrEqual(1);

    const signUpLinks = screen.getAllByRole("link").filter(
      (link) => link.getAttribute("href") === "/sign-up"
    );
    expect(signUpLinks.length).toBeGreaterThanOrEqual(1);
  });

  it("renders navigation links (Features, Pricing, Docs, Customers)", () => {
    render(<Page />);

    expect(
      screen.getAllByRole("link", { name: /features/i }).length
    ).toBeGreaterThan(0);
    expect(
      screen.getAllByRole("link", { name: /pricing/i }).length
    ).toBeGreaterThan(0);
    expect(
      screen.getAllByRole("link", { name: /docs/i }).length
    ).toBeGreaterThan(0);
    expect(
      screen.getAllByRole("link", { name: /customers/i }).length
    ).toBeGreaterThan(0);
  });

  it('renders the pricing section with "Simple plans for families" heading', () => {
    render(<Page />);

    expect(
      screen.getByRole("heading", { name: /Simple plans for families/i })
    ).toBeInTheDocument();
  });

  it("renders all 3 pricing tiers (Free Viewer, Family Archivist, Grand Historian)", () => {
    render(<Page />);

    expect(screen.getByText("Free Viewer")).toBeInTheDocument();
    expect(screen.getByText("Family Archivist")).toBeInTheDocument();
    expect(screen.getByText("Grand Historian")).toBeInTheDocument();
  });

  it("renders the statistics section with all stat values", () => {
    render(<Page />);

    expect(screen.getByText("100%")).toBeInTheDocument();
    expect(screen.getByText("240+ Hrs")).toBeInTheDocument();
    expect(screen.getByText("Highlight Seek")).toBeInTheDocument();
    expect(screen.getByText("1080p")).toBeInTheDocument();
  });

  it("renders all 6 service feature titles", () => {
    render(<Page />);

    expect(screen.getByText("High Fidelity Streaming")).toBeInTheDocument();
    expect(screen.getByText("Interactive Highlights")).toBeInTheDocument();
    expect(screen.getByText("Private Vault Security")).toBeInTheDocument();
    expect(screen.getByText("Era & Season Browsing")).toBeInTheDocument();
    expect(screen.getByText("Nostalgic Format Support")).toBeInTheDocument();
    expect(screen.getByText("Archivist Control Grid")).toBeInTheDocument();
  });

  it("renders testimonial with author name", () => {
    render(<Page />);

    expect(screen.getAllByText("Jordan Avery").length).toBeGreaterThanOrEqual(1);
  });

  it('renders CTA section with "Ready to preserve your family\'s sports legacy?"', () => {
    render(<Page />);

    expect(
      screen.getByRole("heading", {
        name: /Ready to preserve your family's sports legacy\?/i,
      })
    ).toBeInTheDocument();
  });

  it("renders footer with Product, Company, Legal columns", () => {
    render(<Page />);

    expect(screen.getByText("Product")).toBeInTheDocument();
    expect(screen.getByText("Company")).toBeInTheDocument();
    expect(screen.getByText("Legal")).toBeInTheDocument();
  });

  it("renders footer copyright with current year", () => {
    render(<Page />);

    const currentYear = new Date().getFullYear();
    expect(
      screen.getByText(new RegExp(`© ${currentYear} LockerRoom Inc`))
    ).toBeInTheDocument();
  });

  it('renders "Supported Archival Formats" logos section', () => {
    render(<Page />);

    expect(screen.getByText("Supported Archival Formats")).toBeInTheDocument();
  });

  it("renders all 5 logo brand names", () => {
    render(<Page />);

    expect(screen.getByText("VHS Tapes")).toBeInTheDocument();
    expect(screen.getByText("8mm Film")).toBeInTheDocument();
    expect(screen.getByText("MiniDV")).toBeInTheDocument();
    expect(screen.getByText("Hi8 Tape")).toBeInTheDocument();
    expect(screen.getByText("Digital HD")).toBeInTheDocument();
  });
});
