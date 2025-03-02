import handleAppleCallback from '@/lib/auth/apple/handleAppleCallback';
import { ProviderName } from '@/lib/auth/data';
// import handleDiscordCallback from '@/lib/auth/discord/handleDiscordCallback';
import handleFacebookCallback from '@/lib/auth/facebook/handleFacebookCallback';
import handleGithubCallback from '@/lib/auth/github/handleGithubCallback';
import handleGoogleCallback from '@/lib/auth/google/handleGoogleCallback';

export async function GET(res: any, { params }: any): Promise<Response> {
	const { callbackProvider } = params;

	if (callbackProvider) {
		try {
			const actions: any = {
				[ProviderName.GITHUB]: handleGithubCallback,
				[ProviderName.GOOGLE]: handleGoogleCallback,
				[ProviderName.FACEBOOK]: handleFacebookCallback,
				// [ProviderName.DISCORD]: handleDiscordCallback,
			};

			if (actions[callbackProvider]) return actions[callbackProvider](res);
		} catch (error) {
			console.error(`Handler Callback Provider error`, error);
		}
	}

	return new Response(null, {
		status: 302,
		headers: {
			Location: `/err?message=${encodeURIComponent('Error Callback')}`,
		},
	});
}

export async function POST(res: any, { params }: any): Promise<Response> {
	const { callbackProvider } = params;

	if (callbackProvider) {
		try {
			const actions: any = {
				[ProviderName.APPLE]: handleAppleCallback,
			};

			if (actions[callbackProvider]) return actions[callbackProvider](res);
		} catch (error) {
			console.error(`Handler Callback Provider error`, error);
		}
	}

	return new Response(null, {
		status: 302,
		headers: {
			Location: `/err?message=${encodeURIComponent('Error Callback')}`,
		},
	});
}
