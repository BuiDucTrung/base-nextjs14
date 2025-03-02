import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
export function middleware(request: NextRequest) {
	const url = request.nextUrl.clone();
	// url.search = url.searchParams.toString();
	// Step 1: Use the incoming request (example)
	const defaultLocale = request.headers.get('x-your-custom-locale') || 'vi';

	// Step 2: Create and call the next-intl middleware (example)
	const handleI18nRouting = createMiddleware({
		locales: ['en', 'vi'],
		defaultLocale,
		localePrefix: 'as-needed',
	});
	const response = handleI18nRouting(request);

	// Step 3: Alter the response (example)
	response.headers.set('x-your-custom-locale', defaultLocale);

	response.headers.set('x-next-url', url.toString());

	return response;
}

// export default createMiddleware(routing);

export const config = {
	// Matcher entries are linked with a logical "or", therefore
	// if one of them matches, the middleware will be invoked.
	matcher: [
		// Match all pathnames except for
		// - … if they start with `/api`, `/_next` or `/_vercel`
		// - … the ones containing a dot (e.g. `favicon.ico`)
		'/((?!api|_next|_vercel|.*\\..*).*)',
	],
};
