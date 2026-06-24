import { render, screen } from "@testing-library/react";
import Footer from "@/components/landing/Footer";

describe("Footer", () => {
  beforeEach(() => {
    render(<Footer />);
  });

  it("renders 'Locker' brand text", () => {
    expect(screen.getByText("Locker")).toBeInTheDocument();
  });

  it("renders copyright with current year", () => {
    const currentYear = new Date().getFullYear().toString();
    expect(screen.getByText(new RegExp(currentYear))).toBeInTheDocument();
  });

  it("renders 'Strictly Private' text", () => {
    expect(screen.getByText(/Strictly Private Family Vault/i)).toBeInTheDocument();
  });
});
