import { ProviderName } from '@/lib/auth/data';
import { GitHub, Google, Facebook, Discord, Apple } from 'arctic';

export const logout = async () => {
	try {
		// await removeCookieUser();
		return {
			error: null,
		};
	} catch (error) {
		return {
			error: `index failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
		};
	}
	return 'Unknown error';
};

export const provider: {
	[ProviderName.GITHUB]?: GitHub;
	[ProviderName.GOOGLE]?: Google;
	[ProviderName.FACEBOOK]?: Facebook;
	[ProviderName.DISCORD]?: Discord;
	[ProviderName.APPLE]?: Apple;
} = {};
