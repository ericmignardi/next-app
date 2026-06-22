import { render, screen } from "@testing-library/react";
import Hero from "@/components/landing/Hero";

describe("Hero", () => {
  beforeEach(() => {
    render(<Hero />);
  });

  it("renders h1 heading containing 'gets things done'", () => {
    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toHaveTextContent(/gets things done/i);
  });

  it("renders description text about Lumen", () => {
    expect(
      screen.getByText(/Lumen brings your projects, docs, and data/i)
    ).toBeInTheDocument();
  });

  it("renders 'Start for free' button", () => {
    expect(
      screen.getByRole("button", { name: /start for free/i })
    ).toBeInTheDocument();
  });

  it("'Start for free' button is wrapped in link to /sign-up", () => {
    const button = screen.getByRole("button", { name: /start for free/i });
    expect(button.closest("a")).toHaveAttribute("href", "/sign-up");
  });

  it("renders 'Watch demo' button", () => {
    expect(
      screen.getByRole("button", { name: /watch demo/i })
    ).toBeInTheDocument();
  });

  it("renders 'No credit card required' text", () => {
    expect(screen.getByText(/no credit card required/i)).toBeInTheDocument();
  });

  it("renders 'New' badge and 'Real-time collaboration' text", () => {
    expect(screen.getByText("New")).toBeInTheDocument();
    expect(
      screen.getByText(/real-time collaboration is here/i)
    ).toBeInTheDocument();
  });
});
