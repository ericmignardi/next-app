import { render, screen } from "@testing-library/react";
import Pricing from "@/components/landing/Pricing";

describe("Pricing", () => {
  beforeEach(() => {
    render(<Pricing />);
  });

  it("renders 'Simple, honest pricing' heading", () => {
    expect(
      screen.getByRole("heading", { name: /simple, honest pricing/i })
    ).toBeInTheDocument();
  });

  it("renders all 3 tier names: Starter, Team, Enterprise", () => {
    expect(screen.getByText("Starter")).toBeInTheDocument();
    expect(screen.getByText("Team")).toBeInTheDocument();
    expect(screen.getByText("Enterprise")).toBeInTheDocument();
  });

  it("renders prices: $0, $24, Custom", () => {
    expect(screen.getByText(/\$0/)).toBeInTheDocument();
    expect(screen.getByText(/\$24/)).toBeInTheDocument();
    expect(screen.getByText("Custom")).toBeInTheDocument();
  });

  it("renders 'Most popular' badge", () => {
    expect(screen.getByText(/most popular/i)).toBeInTheDocument();
  });

  it("renders CTA buttons: 'Get started', 'Start free trial', 'Contact sales'", () => {
    expect(
      screen.getByRole("button", { name: /get started/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /start free trial/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /contact sales/i })
    ).toBeInTheDocument();
  });

  it("renders feature lists (at least one per tier)", () => {
    const listItems = screen.getAllByRole("listitem");
    expect(listItems.length).toBeGreaterThanOrEqual(3);
  });
});
