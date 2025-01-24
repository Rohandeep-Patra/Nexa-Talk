import { clerkMiddleware , createRouteMatcher } from '@clerk/nextjs/server'


const protectedRoutes = createRouteMatcher([
  '/',
  '/upcoming',
  '/previous',
  '/recordings',
  '/personal-room',
  '/meetings(.*)',
])
export default clerkMiddleware(async (auth, req) => {
  if (protectedRoutes(req)) {
    const authObject = await auth();
    if (!authObject.userId) {
      // Redirect unauthenticated users to the sign-in page
      return authObject.redirectToSignIn();
    }
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}