import { render, screen } from "@testing-library/react";
import Logos from "@/components/landing/Logos";

describe("Logos", () => {
  beforeEach(() => {
    render(<Logos />);
  });

  it("renders 'Trusted by fast-moving teams' text", () => {
    expect(
      screen.getByText(/trusted by fast-moving teams/i)
    ).toBeInTheDocument();
  });

  it("renders all 5 logo names", () => {
    expect(screen.getByText("acme")).toBeInTheDocument();
    expect(screen.getByText("globex")).toBeInTheDocument();
    expect(screen.getByText("hooli")).toBeInTheDocument();
    expect(screen.getByText("initech")).toBeInTheDocument();
    expect(screen.getByText("umbra")).toBeInTheDocument();
  });
});
