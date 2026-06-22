import { render, screen } from "@testing-library/react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

describe("Card", () => {
  it('renders with data-slot="card" and default data-size="default"', () => {
    render(<Card>Content</Card>);
    const card = screen.getByText("Content");
    expect(card).toHaveAttribute("data-slot", "card");
    expect(card).toHaveAttribute("data-size", "default");
  });

  it('renders with data-size="sm" when size="sm"', () => {
    render(<Card size="sm">Small card</Card>);
    expect(screen.getByText("Small card")).toHaveAttribute("data-size", "sm");
  });

  it("accepts custom className", () => {
    render(<Card className="my-card">Styled</Card>);
    expect(screen.getByText("Styled")).toHaveClass("my-card");
  });
});

describe("CardHeader", () => {
  it('renders with data-slot="card-header"', () => {
    render(<CardHeader>Header</CardHeader>);
    expect(screen.getByText("Header")).toHaveAttribute("data-slot", "card-header");
  });
});

describe("CardTitle", () => {
  it('renders children with data-slot="card-title"', () => {
    render(<CardTitle>Title</CardTitle>);
    const title = screen.getByText("Title");
    expect(title).toBeInTheDocument();
    expect(title).toHaveAttribute("data-slot", "card-title");
  });
});

describe("CardDescription", () => {
  it('renders children with data-slot="card-description"', () => {
    render(<CardDescription>Description</CardDescription>);
    const desc = screen.getByText("Description");
    expect(desc).toBeInTheDocument();
    expect(desc).toHaveAttribute("data-slot", "card-description");
  });
});

describe("CardContent", () => {
  it('renders children with data-slot="card-content"', () => {
    render(<CardContent>Body</CardContent>);
    const content = screen.getByText("Body");
    expect(content).toBeInTheDocument();
    expect(content).toHaveAttribute("data-slot", "card-content");
  });
});

describe("CardFooter", () => {
  it('renders children with data-slot="card-footer"', () => {
    render(<CardFooter>Footer</CardFooter>);
    const footer = screen.getByText("Footer");
    expect(footer).toBeInTheDocument();
    expect(footer).toHaveAttribute("data-slot", "card-footer");
  });
});
