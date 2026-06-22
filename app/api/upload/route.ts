import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { mux } from "@/lib/mux";

export async function POST(request: NextRequest) {
  const { userId } = await auth();

  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const upload = await mux.video.uploads.create({
      cors_origin: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
      new_asset_settings: {
        playback_policy: ["public"],
        encoding_tier: "smart",
      },
    });

    return NextResponse.json({
      uploadUrl: upload.url,
      uploadId: upload.id,
    });
  } catch (error) {
    console.error("Mux Direct Upload Request Failed: ", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
