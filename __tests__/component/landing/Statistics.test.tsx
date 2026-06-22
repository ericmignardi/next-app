import { render, screen } from "@testing-library/react";
import Statistics from "@/components/landing/Statistics";

describe("Statistics", () => {
  beforeEach(() => {
    render(<Statistics />);
  });

  it("renders all 4 stat values", () => {
    expect(screen.getByText("12k+")).toBeInTheDocument();
    expect(screen.getByText("99.99%")).toBeInTheDocument();
    expect(screen.getByText("48ms")).toBeInTheDocument();
    expect(screen.getByText("4.9/5")).toBeInTheDocument();
  });

  it("renders all 4 stat labels", () => {
    expect(screen.getByText(/teams onboarded/i)).toBeInTheDocument();
    expect(screen.getByText(/uptime sla/i)).toBeInTheDocument();
    expect(screen.getByText(/median response/i)).toBeInTheDocument();
    expect(screen.getByText(/average rating/i)).toBeInTheDocument();
  });
});
