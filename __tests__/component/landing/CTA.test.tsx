import { render, screen } from "@testing-library/react";
import CTA from "@/components/landing/CTA";

describe("CTA", () => {
  beforeEach(() => {
    render(<CTA />);
  });

  it("renders heading text", () => {
    expect(
      screen.getByRole("heading", {
        name: /ready to give your team momentum/i,
      })
    ).toBeInTheDocument();
  });

  it("renders description", () => {
    expect(screen.getByText(/join thousands/i)).toBeInTheDocument();
  });

  it("renders 'Start for free' button", () => {
    expect(
      screen.getByRole("button", { name: /start for free/i })
    ).toBeInTheDocument();
  });

  it("'Start for free' links to /sign-up", () => {
    const button = screen.getByRole("button", { name: /start for free/i });
    expect(button.closest("a")).toHaveAttribute("href", "/sign-up");
  });

  it("renders 'Talk to sales' button", () => {
    expect(
      screen.getByRole("button", { name: /talk to sales/i })
    ).toBeInTheDocument();
  });
});
