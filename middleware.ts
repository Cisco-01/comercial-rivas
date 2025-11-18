import { clerkMiddleware } from '@clerk/nextjs/server';
//import { NextResponse } from "next/server";

// Define protected routes
/*const isProtectedRoute = createRouteMatcher([
  "/success(.*)", // Protect the success page
  "/api/(.*)", // Protect API routes (if using API routes)
  "/actions/(.*)", // Protect Server Actions (optional, depending on your setup)
]);*/

export default clerkMiddleware();

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
    "/api/payment-intent/:path*"
  ],
};