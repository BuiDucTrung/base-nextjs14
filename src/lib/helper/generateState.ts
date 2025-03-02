import getCallbackUrl from '@/lib/helper/getCallbackUrl';
import { generateState as _generateState } from 'arctic';

export default function generateState(request: Request) {
	//
	try {
		const obj = {
			rnd: _generateState(),
		} as any;

		const callbackUrl = getCallbackUrl(request.url);
		if (callbackUrl) obj.callbackUrl = callbackUrl;

		return JSON.stringify(obj);
	} catch (error) {
		throw new Error(`generateState failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
	}
}
