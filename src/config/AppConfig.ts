export const AppConfig = {
	environment: process.env.NEXT_PUBLIC_ENV || 'development',
	siteName: process.env.NEXT_PUBLIC_SITE_NAME || 'Base Next.js14',
	locale: process.env.NEXT_PUBLIC_LOCALE || 'vi',
	TZ: process.env.TZ || 'Asia/Ho_Chi_Minh',

	get title(): string {
		return AppConfig.siteName;
	},

	icons: {
		favicon: '/favicon.ico',
		icon: '/apple-touch-icon.webp',
		shortcut: '/apple-touch-icon.webp',
		apple: '/apple-touch-icon.webp',
		other: {
			rel: 'apple-touch-icon.webp',
			url: '/apple-touch-icon.webp',
		},
	},

	description: 'Nextjs14 Starter',

	getBaseUrl: (url = '') => {
		if (url?.endsWith('/')) {
			url = url.slice(0, -1);
		}
		if (!url?.startsWith('/')) {
			url = `/${url}`;
		}
		return process.env.NEXT_PUBLIC_BASE_URL ? `${process.env.NEXT_PUBLIC_BASE_URL}${url}` : url;
	},

	getApi: (url = '') => {
		// remove it if config trailingSlash: true, on next.config
		if (url?.endsWith('/')) {
			url = url.slice(0, -1);
		}
		if (!url?.startsWith('/')) {
			url = `/${url}`;
		}
		return process.env.NEXT_PUBLIC_API_BASE_URL ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/api${url}` : url;
	},
};
