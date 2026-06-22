import { render, screen } from "@testing-library/react";
import Footer from "@/components/landing/Footer";

describe("Footer", () => {
  beforeEach(() => {
    render(<Footer />);
  });

  it("renders 'Lumen' brand text", () => {
    expect(screen.getByText("Lumen")).toBeInTheDocument();
  });

  it("renders Product, Company, Legal column headings", () => {
    expect(screen.getByText("Product")).toBeInTheDocument();
    expect(screen.getByText("Company")).toBeInTheDocument();
    expect(screen.getByText("Legal")).toBeInTheDocument();
  });

  it("renders all Product links (Features, Pricing, Integrations, Changelog)", () => {
    expect(screen.getByText("Features")).toBeInTheDocument();
    expect(screen.getByText("Pricing")).toBeInTheDocument();
    expect(screen.getByText("Integrations")).toBeInTheDocument();
    expect(screen.getByText("Changelog")).toBeInTheDocument();
  });

  it("renders all Company links (About, Blog, Careers, Contact)", () => {
    expect(screen.getByText("About")).toBeInTheDocument();
    expect(screen.getByText("Blog")).toBeInTheDocument();
    expect(screen.getByText("Careers")).toBeInTheDocument();
    expect(screen.getByText("Contact")).toBeInTheDocument();
  });

  it("renders all Legal links (Privacy, Terms, Security)", () => {
    expect(screen.getByText("Privacy")).toBeInTheDocument();
    expect(screen.getByText("Terms")).toBeInTheDocument();
    expect(screen.getByText("Security")).toBeInTheDocument();
  });

  it("renders copyright with current year", () => {
    const currentYear = new Date().getFullYear().toString();
    expect(screen.getByText(new RegExp(currentYear))).toBeInTheDocument();
  });

  it("renders 'made with care' text", () => {
    expect(screen.getByText(/made with care/i)).toBeInTheDocument();
  });
});
