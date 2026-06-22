import { render, screen } from "@testing-library/react";
import Page from "@/app/page";

describe("Landing Page Integration", () => {
  it("renders the hero heading and description", () => {
    render(<Page />);

    const heroHeading = screen.getByRole("heading", { level: 1 });
    expect(heroHeading).toHaveTextContent(/gets things done/i);

    expect(
      screen.getByText(/Lumen brings your projects, docs, and data/i)
    ).toBeInTheDocument();
  });

  it('renders "Start for free" CTA buttons with links to /sign-up', () => {
    render(<Page />);

    const startButtons = screen.getAllByRole("button", {
      name: /start for free/i,
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

  it('renders the pricing section with "Simple, honest pricing" heading', () => {
    render(<Page />);

    expect(
      screen.getByRole("heading", { name: /Simple, honest pricing/i })
    ).toBeInTheDocument();
  });

  it("renders all 3 pricing tiers (Starter, Team, Enterprise)", () => {
    render(<Page />);

    expect(screen.getByText("Starter")).toBeInTheDocument();
    expect(screen.getByText("Team")).toBeInTheDocument();
    expect(screen.getByText("Enterprise")).toBeInTheDocument();
  });

  it("renders the statistics section with all stat values", () => {
    render(<Page />);

    expect(screen.getByText("12k+")).toBeInTheDocument();
    expect(screen.getByText("99.99%")).toBeInTheDocument();
    expect(screen.getByText("48ms")).toBeInTheDocument();
    expect(screen.getByText("4.9/5")).toBeInTheDocument();
  });

  it("renders all 6 service feature titles", () => {
    render(<Page />);

    expect(screen.getByText("Lightning fast")).toBeInTheDocument();
    expect(screen.getByText("Real-time sync")).toBeInTheDocument();
    expect(screen.getByText("Granular controls")).toBeInTheDocument();
    expect(screen.getByText("Automations")).toBeInTheDocument();
    expect(screen.getByText("Insightful analytics")).toBeInTheDocument();
    expect(screen.getByText("Enterprise security")).toBeInTheDocument();
  });

  it("renders testimonial with author name", () => {
    render(<Page />);

    expect(screen.getByText("Jordan Avery")).toBeInTheDocument();
  });

  it('renders CTA section with "Ready to give your team momentum?"', () => {
    render(<Page />);

    expect(
      screen.getByRole("heading", {
        name: /Ready to give your team momentum\?/i,
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
      screen.getByText(new RegExp(`© ${currentYear} Lumen Inc`))
    ).toBeInTheDocument();
  });

  it('renders "Trusted by fast-moving teams" logos section', () => {
    render(<Page />);

    expect(screen.getByText("Trusted by fast-moving teams")).toBeInTheDocument();
  });

  it("renders all 5 logo brand names", () => {
    render(<Page />);

    expect(screen.getByText("acme")).toBeInTheDocument();
    expect(screen.getByText("globex")).toBeInTheDocument();
    expect(screen.getByText("hooli")).toBeInTheDocument();
    expect(screen.getByText("initech")).toBeInTheDocument();
    expect(screen.getByText("umbra")).toBeInTheDocument();
  });
});
