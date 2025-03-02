import env from '@/config/env';
import { provider } from '@/lib/auth';
import { getOAuthState, ProviderName } from '@/lib/auth/data';
import { ensureProviderExists } from '@/lib/auth/middleware/ensureProviderExists';
import oauthLoginInitiator from '@/lib/auth/middleware/oauthLoginInitiator';
import generateState from '@/lib/helper/generateState';

export default async function initiateGoogleOAuth(request: Request) {
	console.log('initiateGoogleOAuth');
	const _providerName = ProviderName.GOOGLE;

	try {
		return ensureProviderExists(_providerName, async () => {
			const state = generateState(request);

			const scopes = [
				'https://www.googleapis.com/auth/userinfo.email',
				'https://www.googleapis.com/auth/userinfo.profile', // This scope is needed for the name
			];

			const url = provider.google!.createAuthorizationURL(state, env('AUTH_SECRET', false), scopes);

			const oauthState = getOAuthState(_providerName);
			return oauthLoginInitiator(request, oauthState, state, url);
		});
	} catch (error) {
		console.log('error :>> ', error);
		throw new Error('Google OAuth', { cause: error });
	}
	return new Response(null, {
		status: 302,
		headers: {
			Location: `/err?message=${encodeURIComponent(`Unexpected Error Initiate ${_providerName} OAuth`)}`,
		},
	});
}
