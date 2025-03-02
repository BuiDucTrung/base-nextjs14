import { CALLBACK_URL_KEY } from '@/lib/auth/data';

export default function getCallbackUrl(requestUrl: any) {
	try {
		const url = new URL(requestUrl);
		const callbackUrl = url.searchParams.get(CALLBACK_URL_KEY);

		if (callbackUrl) return callbackUrl;
		return undefined;
	} catch (error) {
		throw new Error(`Get Callback Url failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
	}
}
