import { render, screen } from "@testing-library/react";
import Page from "@/app/page";

// Mock next/navigation for router context in JSDOM environment
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
  }),
  usePathname: () => "/",
}));

describe("Landing/Home Page Integration", () => {
  it("renders the main hero header and description text", () => {
    render(<Page />);

    // Check main heading in Hero component
    const heroHeading = screen.getByRole("heading", { level: 1 });
    expect(heroHeading).toHaveTextContent(/gets things done/i);

    // Check product description
    expect(screen.getByText(/Lumen brings your projects, docs, and data/i)).toBeInTheDocument();
  });

  it("renders multiple 'Start for free' buttons linking to sign-up", () => {
    render(<Page />);

    // Hero or CTA should contain a CTA button with "Start for free"
    const startButtons = screen.getAllByRole("button", { name: /start for free/i });
    expect(startButtons.length).toBeGreaterThanOrEqual(1);

    // Links to sign-up / sign-in
    const signUpLinks = screen.getAllByRole("link").filter(
      (link) => link.getAttribute("href") === "/sign-up"
    );
    expect(signUpLinks.length).toBeGreaterThanOrEqual(1);
  });

  it("renders navigation links in the header", () => {
    render(<Page />);
    
    // Links to features, pricing, etc. (using getAllByRole to avoid ambiguity due to multiple links)
    expect(screen.getAllByRole("link", { name: /features/i }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole("link", { name: /pricing/i }).length).toBeGreaterThan(0);
  });

  it("renders pricing plans and statistics components", () => {
    render(<Page />);

    // Pricing header check (h3 tag)
    expect(screen.getByRole("heading", { name: /Simple, honest pricing/i })).toBeInTheDocument();

    // Statistics section verification
    expect(screen.getByText(/Teams onboarded/i)).toBeInTheDocument();
  });
});
