import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isAdminRoute = createRouteMatcher(["/admin(.*)"]);
const isPublicRoute = createRouteMatcher(["/sign-in(.*)", "/sign-up(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  if (isAdminRoute(req)) {
    const session = await auth();

    // If the user is logged in, perform the admin check.
    // Otherwise, allow the request to fall through to auth.protect() below.
    if (session.userId) {
      const isAdmin = session.sessionClaims?.metadata?.isAdmin === true;
      if (!isAdmin) {
        // If a guest logs in and tries to access /admin, redirect them to the dashboard
        return NextResponse.redirect(new URL("/dashboard", req.url));
      }
    }
  }

  if (!isPublicRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
    "/__clerk/(.*)",
  ],
};
