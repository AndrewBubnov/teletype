import { authMiddleware } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

export default authMiddleware({
	afterAuth(auth, req, evt) {
		if (auth.userId && !auth.orgId && !req.nextUrl.pathname.startsWith('/chat')) {
			const orgSelection = new URL('/chat', req.url);
			return NextResponse.redirect(orgSelection);
		}
	},
});

export const config = {
	matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
