import { render, screen } from "@testing-library/react";
import Header from "@/components/landing/Header";

describe("Header", () => {
  beforeEach(() => {
    render(<Header />);
  });

  it("renders 'Locker' brand text", () => {
    expect(screen.getByText("Locker")).toBeInTheDocument();
  });

  it("renders 'Sign in' link with href /sign-in", () => {
    const signInLink = screen.getByText("Sign in");
    expect(signInLink).toBeInTheDocument();
    expect(signInLink.closest("a")).toHaveAttribute("href", "/sign-in");
  });

  it("renders 'Register Vault' link with href /sign-up", () => {
    const registerLink = screen.getByText("Register Vault");
    expect(registerLink).toBeInTheDocument();
    expect(registerLink.closest("a")).toHaveAttribute("href", "/sign-up");
  });
});
