import { provider } from '@/lib/auth';
import { getOAuthState, ProviderName } from '@/lib/auth/data';
import { ensureProviderExists } from '@/lib/auth/middleware/ensureProviderExists';
import oauthLoginInitiator from '@/lib/auth/middleware/oauthLoginInitiator';
import generateState from '@/lib/helper/generateState';

export default async function initiateGithubOAuth(request: Request) {
	const _providerName = ProviderName.GITHUB;
	try {
		return ensureProviderExists(_providerName, async () => {
			const state = generateState(request);
			const scope = ['read:user', 'user:email'];
			const url = provider[_providerName]!.createAuthorizationURL(state, scope);

			const oauthState = getOAuthState(_providerName);
			return oauthLoginInitiator(request, oauthState, state, url);
		});
	} catch (error) {
		throw new Error('Github OAuth', { cause: error });
	}
	return new Response(null, {
		status: 302,
		headers: {
			Location: `/err?message=${encodeURIComponent(`Unexpected Error Initiate ${_providerName} OAuth`)}`,
		},
	});
}
