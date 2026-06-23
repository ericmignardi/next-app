import { render, screen } from "@testing-library/react";
import Header from "@/components/landing/Header";

describe("Header", () => {
  beforeEach(() => {
    render(<Header />);
  });

  it("renders 'Locker' brand text", () => {
    expect(screen.getByText("Locker")).toBeInTheDocument();
  });

  it("renders Features, Pricing, Docs, Customers nav links", () => {
    expect(screen.getByText("Features")).toBeInTheDocument();
    expect(screen.getByText("Pricing")).toBeInTheDocument();
    expect(screen.getByText("Docs")).toBeInTheDocument();
    expect(screen.getByText("Customers")).toBeInTheDocument();
  });

  it("renders 'Sign in' link with href /sign-in", () => {
    const signInLink = screen.getByText("Sign in");
    expect(signInLink).toBeInTheDocument();
    expect(signInLink.closest("a")).toHaveAttribute("href", "/sign-in");
  });

  it("renders 'Get started' link with href /sign-up", () => {
    const getStartedLink = screen.getByText("Get started");
    expect(getStartedLink).toBeInTheDocument();
    expect(getStartedLink.closest("a")).toHaveAttribute("href", "/sign-up");
  });
});
