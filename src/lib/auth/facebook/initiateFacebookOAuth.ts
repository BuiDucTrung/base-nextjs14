import { provider } from '@/lib/auth';
import { getOAuthState, ProviderName } from '@/lib/auth/data';
import { ensureProviderExists } from '@/lib/auth/middleware/ensureProviderExists';
import oauthLoginInitiator from '@/lib/auth/middleware/oauthLoginInitiator';
import generateState from '@/lib/helper/generateState';

export default async function initiateFacebookOAuth(request: Request) {
	const _providerName = ProviderName.FACEBOOK;
	try {
		return ensureProviderExists(_providerName, async () => {
			const state = generateState(request);

			const scopes = [
				'public_profile', // This scope allows access to public information, including name
				'email', // This scope is needed for the email
			];

			const url = provider[_providerName]!.createAuthorizationURL(state, scopes);
			const oauthState = getOAuthState(_providerName);
			return oauthLoginInitiator(request, oauthState, state, url);
		});
	} catch (error) {
		throw new Error('Facebook OAuth', { cause: error });
	}
	return new Response(null, {
		status: 302,
		headers: {
			Location: `/err?message=${encodeURIComponent(`Unexpected Error Initiate ${_providerName} OAuth`)}`,
		},
	});
}
