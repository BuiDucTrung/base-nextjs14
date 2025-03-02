import env from '@/config/env';
import { provider } from '@/lib/auth';
import { ProviderName } from '@/lib/auth/data';
import oauthCallbackHandler from '@/lib/auth/middleware/oauthCallbackHandler';
import { OAuthAccount } from '@/lib/auth/models/OAuthAccount';
import axios from 'axios';

interface GoogleUser {
	sub: string;
	name: string;
	picture?: string;
	email?: string;
}

export default function handleGoogleCallback(request: Request): Promise<Response> {
	const _providerName = ProviderName.GOOGLE;

	const getData = async (code: string) => {
		try {
			const tokens = await provider.google!.validateAuthorizationCode(code, env('AUTH_SECRET', false));

			const accessToken = tokens.accessToken();

			const googleUserResponse = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			});
			const user: GoogleUser = googleUserResponse.data;

			const data = {
				name: user.name,
				email: user.email,
				image: user.picture,

				providerAccountId: user.sub,
				provider: _providerName,
				accessToken,
			};
			return new OAuthAccount(data);
		} catch (error) {
			console.error(`getData error`, error);
		}
		return null;
	};
	const url = new URL(request.url);
	const code = url.searchParams.get('code');
	const state = url.searchParams.get('state');

	return oauthCallbackHandler(code, state, _providerName, getData);
}
