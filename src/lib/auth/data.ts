export enum ProviderName {
	GITHUB = 'github',
	GOOGLE = 'google',
	FACEBOOK = 'facebook',
	DISCORD = 'discord',
	APPLE = 'apple',
}

export const getOAuthState = (name: string) => {
	return `${name}_oauth_state`;
};

export const CALLBACK_URL_KEY = 'callbackUrl';
