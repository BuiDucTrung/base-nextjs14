import env from '@/config/env';
import { provider } from '@/lib/auth';
import { ProviderName } from '@/lib/auth/data';
import oauthCallbackHandler from '@/lib/auth/middleware/oauthCallbackHandler';
import { OAuthAccount } from '@/lib/auth/models/OAuthAccount';
import axios from 'axios';

interface FacebookUser {
	id: string;
	name: string;
	email?: string;
	picture?: {
		data: {
			url: string;
		};
	};
}
export default async function handleFacebookCallback(request: Request): Promise<Response> {
	const _providerName = ProviderName.FACEBOOK;

	const getData = async (code: string) => {
		try {
			const tokens = await provider.facebook!.validateAuthorizationCode(code);
			const accessToken = tokens.accessToken();
			const facebookUserResponse = await axios.get(
				`https://graph.facebook.com/${env('FACEBOOK_GRAPH_VERSION', true, 'v18.0')}/me?fields=id,name,email,picture.type(large)&access_token=${accessToken}`
			);
			const facebookUser: FacebookUser = facebookUserResponse.data;

			const providerAccountId = facebookUser.id;
			const data = {
				name: facebookUser.name,
				email: facebookUser.email,
				image: facebookUser.picture?.data?.url,

				providerAccountId,
				provider: _providerName,
				accessToken,
			};
			return new OAuthAccount(data);
		} catch (error) {
			console.error(`handleFacebookCallback error`, error);
		}
		return null;
	};
	const url = new URL(request.url);
	const code = url.searchParams.get('code');
	const state = url.searchParams.get('state');

	return oauthCallbackHandler(code, state, _providerName, getData);
}
