import { render, screen } from "@testing-library/react";
import { MediaRow } from "@/components/video/media-row";

const videos = [
  { id: "v1", title: "Game 1", sport: "Hockey", year: "2024", team: "Rangers", muxPlaybackId: "play1" },
  { id: "v2", title: "Game 2", sport: "Baseball", year: "2023", team: "Tigers", muxPlaybackId: "play2" },
];

describe("MediaRow", () => {
  it("returns null when videos array is empty", () => {
    const { container } = render(
      <MediaRow title="Empty Row" videos={[]} />
    );

    expect(container.innerHTML).toBe("");
  });

  it("renders row title", () => {
    render(<MediaRow title="Recent Games" videos={videos} />);

    expect(
      screen.getByRole("heading", { level: 2, name: "Recent Games" })
    ).toBeInTheDocument();
  });

  it("renders description when provided", () => {
    render(
      <MediaRow
        title="Recent Games"
        description="Latest highlights from this season"
        videos={videos}
      />
    );

    expect(
      screen.getByText("Latest highlights from this season")
    ).toBeInTheDocument();
  });

  it("renders a VideoCard for each video", () => {
    render(<MediaRow title="Recent Games" videos={videos} />);

    const headings = screen.getAllByRole("heading", { level: 3 });
    expect(headings).toHaveLength(2);
    expect(headings[0]).toHaveTextContent("Game 1");
    expect(headings[1]).toHaveTextContent("Game 2");
  });
});
