import { provider } from '@/lib/auth';
import { ProviderName } from '@/lib/auth/data';

export function ensureProviderExists(providerName: ProviderName, next: () => void) {
	console.log('ensureProviderExists', providerName);
	const oauthProvider = provider[providerName];
	if (!oauthProvider) {
		return new Response(null, {
			status: 302,
			headers: {
				Location: `/err?message=${encodeURIComponent('Not Found Provider')}`,
			},
		});
	}
	return next();
}
