import { AppConfig } from '@/config/AppConfig';
import { CALLBACK_URL_KEY, getOAuthState, ProviderName } from '@/lib/auth/data';
import { OAuthAccount } from '@/lib/auth/models/OAuthAccount';
import { OAuth2RequestError } from 'arctic';
import { cookies } from 'next/headers';

export default async function oauthCallbackHandler(
	code: any,
	state: any,
	provider: string,
	handler: any
): Promise<Response> {
	const storedState = cookies().get(getOAuthState(provider))?.value ?? null;

	// Check if we need to verify state based on provider
	if (!code || !state) {
		return new Response(null, {
			status: 400,
		});
	}

	// Skip state verification for Apple
	if (provider !== ProviderName.APPLE && (!storedState || state !== storedState)) {
		return new Response(null, {
			status: 400,
		});
	}

	let callbackUrl = undefined;

	try {
		const obj = JSON.parse(state);
		callbackUrl = obj[CALLBACK_URL_KEY];
	} catch (error) {}

	try {
		const data = (await handler(code)) as OAuthAccount;
		if (data) {
			// FIX ME
			// FIX ME
			// FIX ME

			// const res = await fetchServer({
			// 	path: AppConfig.getApi('/auth/login-social'),
			// 	method: 'POST',
			// 	data: {
			// 		provider,
			// 		accessToken: data.accessToken,
			// 	},
			// });

			// const resData = res.data as any;

			// if (res.status) await saveCookieUser(resData);
			// else throw new Error(res.message || `Unknown`);
			console.log('resData callback url :>> ', data);

			return new Response(null, {
				status: 302,
				headers: {
					Location: callbackUrl ?? AppConfig.getBaseUrl(),
				},
			});
			// }
		}
	} catch (e) {
		console.error('OAuth Callback Handler Error: ', e);
		if (e instanceof OAuth2RequestError && e.message === 'bad_verification_code') {
			// invalid code
		}

		const url = new URL(AppConfig.getBaseUrl('/'));
		url.searchParams.append('error', e instanceof Error ? e.message : 'Unknown error');

		return new Response(null, {
			status: 302,
			headers: {
				Location: url.toString(),
			},
		});
	}

	return new Response(null, {
		status: 302,
		headers: {
			Location: AppConfig.getBaseUrl('/'),
		},
	});
}
