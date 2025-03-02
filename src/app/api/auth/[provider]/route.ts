import initiateAppleOAuth from '@/lib/auth/apple/initiateAppleOAuth';
import { ProviderName } from '@/lib/auth/data';
import initiateFacebookOAuth from '@/lib/auth/facebook/initiateFacebookOAuth';
import initiateGithubOAuth from '@/lib/auth/github/initiateGithubOAuth';
import initiateGoogleOAuth from '@/lib/auth/google/initiateGoogleOAuth';

export async function GET(_: any, { params }: any): Promise<Response> {
	console.log('params :>>111 ', params);
	const { provider } = params;

	if (provider) {
		try {
			const actions: any = {
				[ProviderName.GITHUB]: initiateGithubOAuth,
				[ProviderName.GOOGLE]: initiateGoogleOAuth,
				[ProviderName.FACEBOOK]: initiateFacebookOAuth,
				// [ProviderName.DISCORD]: initiateDiscordOAuth,
				[ProviderName.APPLE]: initiateAppleOAuth,
				//
			};

			if (actions[provider]) return actions[provider](_);
		} catch (error) {
			return new Response(null, {
				status: 302,
				headers: {
					Location: `/err?message=${encodeURIComponent(`Login failed: ${error instanceof Error ? error.message : 'Unknown Login Error'}`)}`,
				},
			});
		}
	}
	return new Response(null, {
		status: 302,
		headers: {
			Location: `/err?message=${encodeURIComponent('Login failed')}`,
		},
	});
}
