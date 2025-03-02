import { provider } from '@/lib/auth';
import { getOAuthState, ProviderName } from '@/lib/auth/data';
import { ensureProviderExists } from '@/lib/auth/middleware/ensureProviderExists';
import oauthLoginInitiator from '@/lib/auth/middleware/oauthLoginInitiator';
import generateState from '@/lib/helper/generateState';

export default async function initiateAppleOAuth(request: Request) {
	const _providerName = ProviderName.APPLE;
	try {
		return ensureProviderExists(_providerName, async () => {
			const state = generateState(request);

			const scopes = ['name', 'email'];

			const url = provider.apple!.createAuthorizationURL(state, scopes);
			url.searchParams.set('response_mode', 'form_post');
			const oauthState = getOAuthState(_providerName);
			return oauthLoginInitiator(request, oauthState, state, url);
		});
	} catch (error) {
		// if (error instanceof OAuth2RequestError) {
		// 	// Invalid authorization code, credentials, or redirect URI
		// 	const code = error.code;
		// 	// ...
		// }
		// if (error instanceof ArcticFetchError) {
		// 	// Failed to call `fetch()`
		// 	const cause = error.cause;
		// 	// ...
		// }

		throw new Error('Apple OAuth', { cause: error });
	}
}
