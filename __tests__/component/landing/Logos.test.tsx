import { render, screen } from "@testing-library/react";
import Logos from "@/components/landing/Logos";

describe("Logos", () => {
  beforeEach(() => {
    render(<Logos />);
  });

  it("renders 'Supported Archival Formats' text", () => {
    expect(
      screen.getByText(/supported archival formats/i)
    ).toBeInTheDocument();
  });

  it("renders all 5 format names", () => {
    expect(screen.getByText("VHS Tapes")).toBeInTheDocument();
    expect(screen.getByText("8mm Film")).toBeInTheDocument();
    expect(screen.getByText("MiniDV")).toBeInTheDocument();
    expect(screen.getByText("Hi8 Tape")).toBeInTheDocument();
    expect(screen.getByText("Digital HD")).toBeInTheDocument();
  });
});
