import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function bulkDeleteVideos(ids: string[]) {
  // Delete in a transaction for safety
  await prisma.$transaction([
    prisma.video.deleteMany({
      where: { id: { in: ids } },
    }),
  ]);
  // Revalidate admin page after deletion
  revalidatePath('/admin');
}
