"use server";

import prisma from '@/lib/prisma';
import { mux } from '@/lib/mux';
import { revalidatePath } from 'next/cache';

export async function bulkDeleteVideos(ids: string[]) {
  // 1. Fetch videos to get Mux asset IDs before deletion
  const videos = await prisma.video.findMany({
    where: { id: { in: ids } },
    select: { muxAssetId: true },
  });

  // 2. Delete Mux assets in parallel (with try-catch to avoid blocking database cleanup)
  await Promise.all(
    videos.map(async (v) => {
      try {
        if (v.muxAssetId) {
          if (v.muxAssetId.startsWith("upl_")) {
            // Cancel pending upload if possible
            await mux.video.uploads.cancel(v.muxAssetId).catch(() => {});
          } else if (!v.muxAssetId.startsWith("pending_")) {
            // Delete actual mux asset
            await mux.video.assets.delete(v.muxAssetId);
          }
        }
      } catch (err) {
        console.error(`Failed to delete Mux asset ${v.muxAssetId}:`, err);
      }
    })
  );

  // 3. Delete in a transaction for safety
  await prisma.$transaction([
    prisma.video.deleteMany({
      where: { id: { in: ids } },
    }),
  ]);

  // Revalidate admin and dashboard pages after deletion
  revalidatePath('/admin');
  revalidatePath('/dashboard');
}
