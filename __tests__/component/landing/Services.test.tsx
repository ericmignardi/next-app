import { render, screen } from "@testing-library/react";
import Services from "@/components/landing/Services";

describe("Services", () => {
  beforeEach(() => {
    render(<Services />);
  });

  it("renders section heading", () => {
    expect(
      screen.getByText(/built for the way teams really work/i)
    ).toBeInTheDocument();
  });

  it("renders all 6 service titles", () => {
    expect(screen.getByText("Lightning fast")).toBeInTheDocument();
    expect(screen.getByText("Real-time sync")).toBeInTheDocument();
    expect(screen.getByText("Granular controls")).toBeInTheDocument();
    expect(screen.getByText("Automations")).toBeInTheDocument();
    expect(screen.getByText("Insightful analytics")).toBeInTheDocument();
    expect(screen.getByText("Enterprise security")).toBeInTheDocument();
  });

  it("renders descriptions for each service", () => {
    const serviceCards = screen.getAllByText(/Lightning fast|Real-time sync|Granular controls|Automations|Insightful analytics|Enterprise security/);
    expect(serviceCards).toHaveLength(6);
  });
});
