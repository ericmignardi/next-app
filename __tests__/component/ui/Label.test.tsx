import { render, screen } from "@testing-library/react";
import { Label } from "@/components/ui/label";

describe("Label", () => {
  it("renders children text", () => {
    render(<Label>Email</Label>);
    expect(screen.getByText("Email")).toBeInTheDocument();
  });

  it('renders with data-slot="label"', () => {
    render(<Label>Name</Label>);
    expect(screen.getByText("Name")).toHaveAttribute("data-slot", "label");
  });

  it("applies custom className", () => {
    render(<Label className="custom-label">Custom</Label>);
    expect(screen.getByText("Custom")).toHaveClass("custom-label");
  });
});
