import { authMiddleware } from '@clerk/nextjs';
import { NextResponse } from 'next/server';
import { ALLOWED_ROUTES } from '@/constants';

export default authMiddleware({
	afterAuth(auth, req, evt) {
		if (auth.userId && !auth.orgId && !ALLOWED_ROUTES.some(el => req.nextUrl.pathname.startsWith(el))) {
			const orgSelection = new URL('/chat', req.url);
			return NextResponse.redirect(orgSelection);
		}
	},
});

export const config = {
	matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
