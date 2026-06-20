import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { notFound } from "next/navigation";

export default async function Profile() {
  const { userId } = await auth();

  if (!userId) {
    return notFound();
  }

  const user = await prisma.user.findUnique({
    where: { clerkId: userId },
  });

  if (!user) {
    return notFound();
  }

  const displayName = [user.firstName, user.lastName].filter(Boolean).join(" ");

  return (
    <div className="min-h-screen flex flex-col bg-background">
      Welcome back, {displayName || user.email}
    </div>
  );
}
