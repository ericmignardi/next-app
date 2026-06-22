import { render, screen } from "@testing-library/react";
import { Badge } from "@/components/ui/badge";

describe("Badge", () => {
  it("renders children text", () => {
    render(<Badge>New</Badge>);
    expect(screen.getByText("New")).toBeInTheDocument();
  });

  it('applies data-variant="destructive" for variant="destructive"', () => {
    render(<Badge variant="destructive">Error</Badge>);
    expect(screen.getByText("Error")).toHaveAttribute("data-variant", "destructive");
  });

  it('applies data-variant="outline" for variant="outline"', () => {
    render(<Badge variant="outline">Outline</Badge>);
    expect(screen.getByText("Outline")).toHaveAttribute("data-variant", "outline");
  });

  it("applies custom className alongside defaults", () => {
    render(<Badge className="extra">Styled</Badge>);
    const badge = screen.getByText("Styled");
    expect(badge).toHaveClass("extra");
  });

  it("applies inline style", () => {
    render(<Badge style={{ color: "rgb(255, 0, 0)" }}>Red</Badge>);
    expect(screen.getByText("Red")).toHaveStyle({ color: "rgb(255, 0, 0)" });
  });

  it('renders data-slot="badge"', () => {
    render(<Badge>Slot</Badge>);
    expect(screen.getByText("Slot")).toHaveAttribute("data-slot", "badge");
  });
});
