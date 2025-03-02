import { provider } from '@/lib/auth';
import { ProviderName } from '@/lib/auth/data';
import oauthCallbackHandler from '@/lib/auth/middleware/oauthCallbackHandler';
import { OAuthAccount } from '@/lib/auth/models/OAuthAccount';

interface AppleUser {
	sub: string; // unique identifier
	email?: string;
	email_verified?: boolean;
	name?: {
		firstName?: string;
		lastName?: string;
	};
}

interface CallbackState {
	rnd: string;
	callbackUrl: string;
}

interface ParsedCallback {
	state: CallbackState;
	code: string;
}

class CallbackParseError extends Error {
	constructor(
		message: string,
		public readonly originalError?: unknown
	) {
		super(message);
		this.name = 'CallbackParseError';
	}
}

function parseCallbackData(text: string): ParsedCallback {
	try {
		//input validation
		if (!text || typeof text !== 'string') {
			throw new CallbackParseError('Invalid input: text must be a non-empty string');
		}

		const pairs = text.split('&');
		const result: Partial<ParsedCallback> = {};

		for (const pair of pairs) {
			// Validate pair format
			if (!pair.includes('=')) {
				throw new CallbackParseError(`Invalid pair format: ${pair}`);
			}

			const [key, value] = pair.split('=');

			if (!value) {
				throw new CallbackParseError(`Missing value for key: ${key}`);
			}

			try {
				if (key === 'state') {
					const decodedState = decodeURIComponent(value);

					try {
						const parsedState = JSON.parse(decodedState);

						// Validate state object structure
						if (!parsedState.rnd || !parsedState.callbackUrl) {
							throw new CallbackParseError('Invalid state object structure');
						}

						result.state = parsedState;
					} catch (err) {
						throw new CallbackParseError('Failed to parse state JSON', err);
					}
				} else if (key === 'code') {
					result.code = decodeURIComponent(value);
				}
			} catch (err) {
				throw new CallbackParseError(`Failed to decode value for key: ${key}`, err);
			}
		}
		// Validate required fields
		if (!result.state || !result.code) {
			throw new CallbackParseError('Missing required fields: state and code');
		}

		return result as ParsedCallback;
	} catch (error) {
		if (error instanceof CallbackParseError) {
			throw error;
		}
		throw new CallbackParseError('Failed to parse callback data', error);
	}
}

export default async function handleAppleCallback(request: Request): Promise<Response> {
	try {
		const _providerName = ProviderName.APPLE;

		const text = await request.text();
		const json = parseCallbackData(decodeURIComponent(text));

		const code = json.code;
		const state = JSON.stringify(json.state);

		const getData = async (_code: string) => {
			try {
				const tokens = await provider.apple!.validateAuthorizationCode(code);
				console.log('tokens :>> ', tokens);
				// Get ID token and decode it

				const idToken = tokens.idToken();
				console.log('idToken :>> ', idToken);

				// Split token into parts [header, payload, signature]
				const [_, payloadBase64] = idToken.split('.');
				// Decode the base64 payload
				const payloadJson = Buffer.from(payloadBase64!, 'base64').toString();
				const idTokenPayload = JSON.parse(payloadJson) as AppleUser;

				const data = {
					name: idTokenPayload.name
						? `${idTokenPayload.name.firstName || ''} ${idTokenPayload.name.lastName || ''}`.trim()
						: 'Apple User',
					email: idTokenPayload.email,
					image: '',
					providerAccountId: idTokenPayload.sub,
					provider: _providerName,
					accessToken: tokens.accessToken(),
					// Optionally store additional token info
					tokenType: tokens.tokenType(),
					expiresAt: tokens.accessTokenExpiresAt().toISOString(),
					refreshToken: tokens.hasRefreshToken() ? tokens.refreshToken() : undefined,
					scopes: tokens.hasScopes() ? tokens.scopes() : undefined,
				};
				console.log('data :>> ', data);

				return new OAuthAccount(data);
			} catch (error) {
				console.error(`getData error`, error);
			}
			return null;
		};
		return oauthCallbackHandler(code, state, _providerName, getData);
	} catch (error) {
		console.error('error!.code :>> ', (error as any)!.code!);
		console.error('error!.cause :>> ', (error as any)!.cause!);
		throw new Error(`Handle Apple Callback failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
	}
}
