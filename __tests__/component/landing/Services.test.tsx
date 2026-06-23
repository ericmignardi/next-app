import { render, screen } from "@testing-library/react";
import Services from "@/components/landing/Services";

describe("Services", () => {
  beforeEach(() => {
    render(<Services />);
  });

  it("renders section heading", () => {
    expect(
      screen.getByText(/everything you need for your family archives/i)
    ).toBeInTheDocument();
  });

  it("renders all 6 service titles", () => {
    expect(screen.getByText("High Fidelity Streaming")).toBeInTheDocument();
    expect(screen.getByText("Interactive Highlights")).toBeInTheDocument();
    expect(screen.getByText("Private Vault Security")).toBeInTheDocument();
    expect(screen.getByText("Era & Season Browsing")).toBeInTheDocument();
    expect(screen.getByText("Nostalgic Format Support")).toBeInTheDocument();
    expect(screen.getByText("Archivist Control Grid")).toBeInTheDocument();
  });

  it("renders descriptions for each service", () => {
    const serviceCards = screen.getAllByText(/High Fidelity Streaming|Interactive Highlights|Private Vault Security|Era & Season Browsing|Nostalgic Format Support|Archivist Control Grid/);
    expect(serviceCards).toHaveLength(6);
  });
});
