import { render, screen } from "@testing-library/react";
import CTA from "@/components/landing/CTA";

describe("CTA", () => {
  beforeEach(() => {
    render(<CTA />);
  });

  it("renders heading text", () => {
    expect(
      screen.getByRole("heading", {
        name: /ready to preserve your family's sports legacy\?/i,
      })
    ).toBeInTheDocument();
  });

  it("renders description", () => {
    expect(screen.getByText(/create your private vault/i)).toBeInTheDocument();
  });

  it("renders 'Create Free Account' button", () => {
    expect(
      screen.getByRole("button", { name: /create free account/i })
    ).toBeInTheDocument();
  });

  it("'Create Free Account' links to /sign-up", () => {
    const button = screen.getByRole("button", { name: /create free account/i });
    expect(button.closest("a")).toHaveAttribute("href", "/sign-up");
  });

  it("renders 'Sign In' button", () => {
    expect(
      screen.getByRole("button", { name: /sign in/i })
    ).toBeInTheDocument();
  });
});
