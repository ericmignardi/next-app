import { verifyWebhook } from "@clerk/nextjs/webhooks";
import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  let evt;
  try {
    evt = await verifyWebhook(req);
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error verifying webhook", { status: 400 });
  }

  const { id } = evt.data;
  console.log(`Received webhook ${id} of type ${evt.type}`);

  if (!id) {
    return new Response("Missing user ID", { status: 400 });
  }

  try {
    switch (evt.type) {
      case "user.created":
      case "user.updated": {
        // evt.data is narrowed to UserJSON here
        const primaryEmail =
          evt.data.email_addresses.find(
            (e) => e.id === evt.data.primary_email_address_id,
          )?.email_address ??
          evt.data.email_addresses[0]?.email_address ??
          "";

        const data = {
          email: primaryEmail,
          firstName: evt.data.first_name ?? null,
          lastName: evt.data.last_name ?? null,
          imageUrl: evt.data.image_url ?? null,
        };

        await prisma.user.upsert({
          where: { clerkId: id },
          create: { clerkId: id, ...data },
          update: data,
        });
        break;
      }
      case "user.deleted": {
        await prisma.user.deleteMany({ where: { clerkId: id } });
        break;
      }
      default:
        console.log(`Unhandled event type: ${evt.type}`);
    }
  } catch (err) {
    console.error("Error processing webhook:", err);
    return new Response("Error processing webhook", { status: 500 });
  }

  return new Response("Webhook received", { status: 200 });
}
