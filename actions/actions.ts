"use server";

import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import { mux } from "@/lib/mux";
import { type VideoModel as Video } from "@/generated/prisma/models";
import { VideoFormValues } from "@/types/video";
import { revalidatePath } from "next/cache";

export async function initializeVideoUpload(
  values: Omit<VideoFormValues, "highlights"> & {
    highlights: { timestamp: string; label: string }[];
  },
) {
  const { userId: clerkId } = await auth();
  if (!clerkId) throw new Error("Unauthorized");

  // 1. Find the internal database record matching the authenticated Clerk ID
  const dbUser = await prisma.user.findUnique({
    where: { clerkId },
  });
  if (!dbUser) throw new Error("User record mismatch in application database");

  // 2. Request direct upload parameters from Mux
  const upload = await mux.video.uploads.create({
    cors_origin: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
    new_asset_settings: {
      playback_policy: ["public"],
      encoding_tier: "smart",
    },
  });

  // 3. Draft the layout entry in your local database using the temporary upload.id as a pointer
  await prisma.video.create({
    data: {
      title: values.title,
      description: values.description,
      sport: values.sport,
      year: values.year,
      team: values.team,
      gameType: values.gameType,
      jerseyNumber: values.jerseyNumber,
      muxAssetId: upload.id, // Stored temporarily to map back when Mux fires video.asset.ready webhook
      muxPlaybackId: `pending_${upload.id}`, // Placeholder until webhook resolves
      userId: dbUser.id,
      highlights: {
        createMany: {
          data: values.highlights,
        },
      },
    },
  });

  return { uploadUrl: upload.url };
}

export async function deleteVideo(id: string, muxAssetId: string) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  try {
    // Remove master asset files from Mux video cloud storage
    // If the video was still pendin, the assetId might be a temporary placeholder, so wrap it in a guard
    if (muxAssetId && !muxAssetId.startsWith("pending_")) {
      await mux.video.assets.delete(muxAssetId);
    }
  } catch (error) {
    console.error("Mux cloud asset deletion failed or asset missing: ", error);
  }

  await prisma.video.delete({
    where: {
      id,
    },
  });

  revalidatePath("/admin");
}

export async function refreshAdmin() {
  revalidatePath("/admin");
}

