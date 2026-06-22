import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

describe("Button component", () => {
  it("renders its children", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole("button", { name: "Click me" })).toBeInTheDocument();
  });

  it("calls onClick when clicked", async () => {
    const user = userEvent.setup();
    const handleClick = jest.fn();

    render(<Button onClick={handleClick}>Submit</Button>);
    await user.click(screen.getByRole("button", { name: "Submit" }));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("does not call onClick when disabled", async () => {
    const user = userEvent.setup();
    const handleClick = jest.fn();

    render(<Button onClick={handleClick} disabled>Submit</Button>);
    await user.click(screen.getByRole("button", { name: "Submit" }));

    expect(handleClick).not.toHaveBeenCalled();
  });

  it("applies secondary variant attribute", () => {
    render(<Button variant="secondary">Cancel</Button>);
    const button = screen.getByRole("button", { name: "Cancel" });
    expect(button).toHaveAttribute("data-variant", "secondary");
  });
});

describe("Badge component", () => {
  it("renders with custom children", () => {
    render(<Badge>Active Status</Badge>);
    expect(screen.getByText("Active Status")).toBeInTheDocument();
  });

  it("applies variant attributes correctly", () => {
    render(<Badge variant="destructive">Alert</Badge>);
    const badge = screen.getByText("Alert");
    expect(badge).toHaveAttribute("data-variant", "destructive");
  });

  it("supports passing extra DOM attributes like style and className", () => {
    render(
      <Badge className="custom-class" style={{ color: "rgb(255, 0, 0)" }}>
        Custom Badge
      </Badge>
    );
    const badge = screen.getByText("Custom Badge");
    expect(badge).toHaveClass("custom-class");
    expect(badge).toHaveStyle("color: rgb(255, 0, 0)");
  });
});
