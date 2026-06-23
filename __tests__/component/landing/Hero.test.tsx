import { render, screen } from "@testing-library/react";
import Hero from "@/components/landing/Hero";

describe("Hero", () => {
  beforeEach(() => {
    render(<Hero />);
  });

  it("renders h1 heading containing 'sports legacy'", () => {
    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toHaveTextContent(/sports legacy/i);
  });

  it("renders description text about LockerRoom", () => {
    expect(
      screen.getByText(/LockerRoom securely hosts, indexes, and streams/i)
    ).toBeInTheDocument();
  });

  it("renders 'Explore the Vault' button", () => {
    expect(
      screen.getByRole("button", { name: /explore the vault/i })
    ).toBeInTheDocument();
  });

  it("'Explore the Vault' button is wrapped in link to /sign-up", () => {
    const button = screen.getByRole("button", { name: /explore the vault/i });
    expect(button.closest("a")).toHaveAttribute("href", "/sign-up");
  });

  it("renders 'Watch Highlights' button", () => {
    expect(
      screen.getByRole("button", { name: /watch highlights/i })
    ).toBeInTheDocument();
  });

  it("renders 'Strictly private' text", () => {
    expect(screen.getByText(/strictly private/i)).toBeInTheDocument();
  });

  it("renders 'VHS to HLS' badge and 'Preserving family sports history' text", () => {
    expect(screen.getByText("VHS to HLS")).toBeInTheDocument();
    expect(
      screen.getByText(/preserving family sports history/i)
    ).toBeInTheDocument();
  });
});
