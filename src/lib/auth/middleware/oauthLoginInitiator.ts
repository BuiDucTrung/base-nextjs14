import { cookies } from 'next/headers';

export default function oauthLoginInitiator(request: Request, idOAuth: string, state: string, url: URL) {
	try {
		cookies().set(idOAuth, state, {
			path: '/',
			secure: process.env.NODE_ENV === 'production',
			httpOnly: true,
			maxAge: 60 * 10,
			sameSite: 'lax',
		});
		return Response.redirect(url);
	} catch (error) {
		console.error(`oauthLoginInitiator error`, error);
	}
	return new Response(null, {
		status: 302,
		headers: {
			Location: `/err?message=${encodeURIComponent('Oauth Login Initiator Error')}`,
		},
	});
}
