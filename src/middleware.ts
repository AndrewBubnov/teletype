import { authMiddleware } from '@clerk/nextjs';
import { NextResponse } from 'next/server';
import { CHAT_LIST, COMMONLY_ALLOWED_ROUTES, ROOT, USER_ALLOWED_ROUTES } from '@/constants';

export default authMiddleware({
	afterAuth(auth, req) {
		if (!auth.userId && !COMMONLY_ALLOWED_ROUTES.includes(req.nextUrl.pathname)) {
			const redirectUrl = new URL(ROOT, req.url);
			return NextResponse.redirect(redirectUrl);
		}
		if (auth.userId && !auth.orgId && !USER_ALLOWED_ROUTES.some(el => req.nextUrl.pathname.startsWith(el))) {
			const orgSelection = new URL(CHAT_LIST, req.url);
			return NextResponse.redirect(orgSelection);
		}
	},
});

export const config = {
	matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
