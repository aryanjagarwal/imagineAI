import { clerkMiddleware } from '@clerk/nextjs/server';
import { authMiddleware } from '@clerk/nextjs/server';

// Make sure that the `/api/webhooks/(.*)` route is not protected here

export default authMiddleware({
  publicRoutes: ['/', '/api/webhooks/clerk', '/api/webhooks/stripe']
});
 
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};


{/*
export default clerkMiddleware({
  publicRoutes: ['/', '/api/webhooks/clerk', '/api/webhooks/stripe']
})

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};

*/}