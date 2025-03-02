import env from '@/config/env';
import { provider } from '@/lib/auth';
import { ProviderName } from '@/lib/auth/data';
import oauthCallbackHandler from '@/lib/auth/middleware/oauthCallbackHandler';
import { OAuthAccount } from '@/lib/auth/models/OAuthAccount';
import axios from 'axios';
interface GitHubUser {
	id: string;
	login: string;
	email?: string;
	avatar_url?: string;
}
export default async function handleGithubCallback(request: Request): Promise<Response> {
	const _providerName = ProviderName.GITHUB;

	const getData = async (code: string) => {
		try {
			const tokens = await provider.github!.validateAuthorizationCode(code);
			const accessToken = tokens.accessToken();
			const githubUserResponse = await axios.get('https://api.github.com/user', {
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			});
			const githubUser: GitHubUser = githubUserResponse.data;

			const providerAccountId = githubUser.id;
			const data = {
				name: githubUser.login,
				email: githubUser.email,
				image: githubUser.avatar_url,

				providerAccountId,
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
