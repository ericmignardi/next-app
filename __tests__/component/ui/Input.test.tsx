import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Input } from "@/components/ui/input";

describe("Input", () => {
  it('renders with data-slot="input"', () => {
    render(<Input />);
    expect(screen.getByRole("textbox")).toHaveAttribute("data-slot", "input");
  });

  it("forwards type prop", () => {
    render(<Input type="email" />);
    expect(screen.getByRole("textbox")).toHaveAttribute("type", "email");
  });

  it("renders as disabled when disabled prop is set", () => {
    render(<Input disabled />);
    expect(screen.getByRole("textbox")).toBeDisabled();
  });

  it("renders placeholder text", () => {
    render(<Input placeholder="Enter email" />);
    expect(screen.getByPlaceholderText("Enter email")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    render(<Input className="custom-input" />);
    expect(screen.getByRole("textbox")).toHaveClass("custom-input");
  });

  it("calls onChange handler", async () => {
    const user = userEvent.setup();
    const handleChange = jest.fn();
    render(<Input onChange={handleChange} />);

    await user.type(screen.getByRole("textbox"), "hello");
    expect(handleChange).toHaveBeenCalled();
  });
});
