import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { mux } from "@/lib/mux";

export async function POST(req: NextRequest) {
  try {
    // 1. Retrieve raw body text and webhook signature for verification
    const body = await req.text();
    const signature = req.headers.get("mux-signature");

    if (!signature) {
      return new NextResponse("Missing Mux signature header", { status: 400 });
    }

    const webhookSecret = process.env.MUX_WEBHOOK_SECRET;
    if (!webhookSecret) {
      console.error("Missing MUX_WEBHOOK_SECRET environment variable");
      return new NextResponse("Webhook configuration error", { status: 500 });
    }

    // 2. Verify signature (will throw an error if verification fails)
    try {
      await mux.webhooks.verifySignature(body, req.headers, webhookSecret);
    } catch (verifyErr) {
      console.error("Mux webhook signature verification failed:", verifyErr);
      return new NextResponse("Invalid signature", { status: 400 });
    }

    // 3. Parse verified JSON body payload
    const jsonBody = JSON.parse(body);
    const { type, data } = jsonBody;

    // 4. Listen for the asset readable/ready event
    if (type === "video.asset.ready") {
      const muxAssetId = data.id;
      const muxPlaybackId = data.playback_ids?.[0]?.id;
      const uploadId = data.upload_id; // Relates back to the temporary upload tracker

      if (!muxPlaybackId) {
        return new NextResponse("No active playback ID found", { status: 400 });
      }

      // 5. Locate the video record matching this upload session and attach the permanent asset links
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

