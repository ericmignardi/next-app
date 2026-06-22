import { render, screen } from "@testing-library/react";
import { VideoCard } from "@/components/video/video-card";

const props = {
  id: "video-123",
  title: "Championship Game",
  sport: "Hockey",
  year: "2024",
  team: "Rangers",
  playbackId: "abc123xyz",
};

describe("VideoCard", () => {
  it("renders the video title in an h3", () => {
    render(<VideoCard {...props} />);

    expect(
      screen.getByRole("heading", { level: 3, name: "Championship Game" })
    ).toBeInTheDocument();
  });

  it("renders team and sport text", () => {
    render(<VideoCard {...props} />);

    expect(screen.getByText(/Rangers •/)).toBeInTheDocument();
    expect(screen.getByText("Hockey")).toBeInTheDocument();
  });

  it("renders year badge", () => {
    render(<VideoCard {...props} />);

    expect(screen.getByText("2024")).toBeInTheDocument();
  });

  it("links to the correct watch URL /watch/{id}", () => {
    render(<VideoCard {...props} />);

    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/watch/video-123");
  });

  it("generates correct Mux thumbnail URL", () => {
    render(<VideoCard {...props} />);

    const img = screen.getByRole("img", { name: "Championship Game" });
    expect(img).toHaveAttribute(
      "src",
      "https://image.mux.com/abc123xyz/thumbnail.webp?time=2"
    );
  });
});
