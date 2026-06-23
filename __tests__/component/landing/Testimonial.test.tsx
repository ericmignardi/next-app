import { render, screen } from "@testing-library/react";
import Testimonial from "@/components/landing/Testimonial";

describe("Testimonial", () => {
  beforeEach(() => {
    render(<Testimonial />);
  });

  it("renders star rating", () => {
    expect(screen.getByText("★★★★★")).toBeInTheDocument();
  });

  it("renders testimonial quote", () => {
    expect(screen.getByText(/digitized over 20 years/i)).toBeInTheDocument();
  });

  it("renders author name 'Jordan Avery'", () => {
    expect(screen.getByText("Jordan Avery")).toBeInTheDocument();
  });

  it("renders role 'Family Archivist & Team Captain'", () => {
    expect(screen.getByText(/Family Archivist & Team Captain/)).toBeInTheDocument();
  });
});
