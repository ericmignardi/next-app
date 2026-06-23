import { render, screen } from "@testing-library/react";
import Statistics from "@/components/landing/Statistics";

describe("Statistics", () => {
  beforeEach(() => {
    render(<Statistics />);
  });

  it("renders all 4 stat values", () => {
    expect(screen.getByText("100%")).toBeInTheDocument();
    expect(screen.getByText("240+ Hrs")).toBeInTheDocument();
    expect(screen.getByText("< 50ms")).toBeInTheDocument();
    expect(screen.getByText("1080p")).toBeInTheDocument();
  });

  it("renders all 4 stat labels", () => {
    expect(screen.getByText(/private access/i)).toBeInTheDocument();
    expect(screen.getByText(/tapes digitized/i)).toBeInTheDocument();
    expect(screen.getByText(/highlight seek/i)).toBeInTheDocument();
    expect(screen.getByText(/preserved quality/i)).toBeInTheDocument();
  });
});
