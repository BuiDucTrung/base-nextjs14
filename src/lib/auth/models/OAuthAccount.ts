import type { ProviderName } from '@/lib/auth/data';

type IOAuthAccount = {
	providerAccountId: string;
	accessToken: string;
	name: string;
	email?: string;
	image?: string;
	provider: ProviderName;
};

export class OAuthAccount {
	providerAccountId!: string;

	accessToken!: string;

	name!: string;

	email?: string;

	image?: string;

	provider!: ProviderName;

	constructor(params: IOAuthAccount) {
		Object.assign(this, params);
	}
}
