import { render, screen, fireEvent } from "@testing-library/react";
import { VideoPlayerShell } from "@/components/video/video-player-shell";

const highlights = [
  { id: "h1", timestamp: "12:34", label: "First Goal" },
  { id: "h2", timestamp: "01:05:00", label: "Hat Trick" },
];

describe("VideoPlayerShell", () => {
  it("renders MuxPlayer with correct playbackId", () => {
    render(<VideoPlayerShell playbackId="test-playback-id" highlights={[]} />);

    const player = screen.getByTestId("mux-player");
    expect(player).toBeInTheDocument();
    expect(player).toHaveAttribute("data-playback-id", "test-playback-id");
  });

  it('renders "Game Index & Highlight Markers" heading', () => {
    render(<VideoPlayerShell playbackId="test-playback-id" highlights={[]} />);

    expect(
      screen.getByRole("heading", { name: /Game Index & Highlight Markers/i })
    ).toBeInTheDocument();
  });

  it("shows empty message when highlights is empty array", () => {
    render(<VideoPlayerShell playbackId="test-playback-id" highlights={[]} />);

    expect(
      screen.getByText(/No interactive timeline highlight tags/i)
    ).toBeInTheDocument();
  });

  it("renders highlight buttons with timestamp and label when highlights provided", () => {
    render(
      <VideoPlayerShell playbackId="test-playback-id" highlights={highlights} />
    );

    expect(screen.getByText("12:34")).toBeInTheDocument();
    expect(screen.getByText("First Goal")).toBeInTheDocument();
    expect(screen.getByText("01:05:00")).toBeInTheDocument();
    expect(screen.getByText("Hat Trick")).toBeInTheDocument();

    const buttons = screen.getAllByRole("button");
    expect(buttons).toHaveLength(2);
  });

  it("clicking a highlight button calls play on the mux player ref", () => {
    render(
      <VideoPlayerShell playbackId="test-playback-id" highlights={highlights} />
    );

    const player = screen.getByTestId("mux-player") as HTMLVideoElement;
    player.play = jest.fn().mockResolvedValue(undefined);

    const firstButton = screen.getAllByRole("button")[0];
    fireEvent.click(firstButton);

    expect(player.play).toHaveBeenCalled();
  });
});
