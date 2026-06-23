import { render, screen } from "@testing-library/react";
import Pricing from "@/components/landing/Pricing";

describe("Pricing", () => {
  beforeEach(() => {
    render(<Pricing />);
  });

  it("renders 'Simple plans for families' heading", () => {
    expect(
      screen.getByRole("heading", { name: /simple plans for families/i })
    ).toBeInTheDocument();
  });

  it("renders all 3 tier names: Free Viewer, Family Archivist, Grand Historian", () => {
    expect(screen.getByText("Free Viewer")).toBeInTheDocument();
    expect(screen.getByText("Family Archivist")).toBeInTheDocument();
    expect(screen.getByText("Grand Historian")).toBeInTheDocument();
  });

  it("renders prices: $0, $9, $29", () => {
    expect(screen.getByText(/\$0/)).toBeInTheDocument();
    expect(screen.getByText(/\$9/)).toBeInTheDocument();
    expect(screen.getByText(/\$29/)).toBeInTheDocument();
  });

  it("renders 'Most popular' badge", () => {
    expect(screen.getByText(/most popular/i)).toBeInTheDocument();
  });

  it("renders CTA buttons: 'Start Streaming', 'Create Family Vault', 'Unlock Grand Vault'", () => {
    expect(
      screen.getByRole("button", { name: /start streaming/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /create family vault/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /unlock grand vault/i })
    ).toBeInTheDocument();
  });

  it("renders feature lists (at least one per tier)", () => {
    const listItems = screen.getAllByRole("listitem");
    expect(listItems.length).toBeGreaterThanOrEqual(3);
  });
});
