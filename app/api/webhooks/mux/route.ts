import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const jsonBody = await req.json();
    const { type, data } = jsonBody;

    // 1. Listen for the asset readable/ready event
    if (type === "video.asset.ready") {
      const muxAssetId = data.id;
      const muxPlaybackId = data.playback_ids?.[0]?.id;
      const uploadId = data.upload_id; // Relates back to the temporary upload tracker

      if (!muxPlaybackId) {
        return new NextResponse("No active playback ID found", { status: 400 });
      }

      // 2. Locate the video record matching this upload session and attach the permanent asset links
      await prisma.video.updateMany({
        where: {
          muxAssetId: uploadId, // During creation, we will temporarily save the uploadId here to map it
        },
        data: {
          muxAssetId: muxAssetId,
          muxPlaybackId: muxPlaybackId,
          duration: data.duration ?? null,
        },
      });

      return NextResponse.json({ received: true }, { status: 200 });
    }

    return NextResponse.json({ message: "Event ignored" }, { status: 200 });
  } catch (error) {
    console.error("Mux Webhook Execution Failure:", error);
    return new NextResponse("Webhook Handler Error", { status: 500 });
  }
}
