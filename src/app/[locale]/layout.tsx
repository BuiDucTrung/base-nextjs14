import LenisScroll from '@/components/common/lenis-scroll/LenisScroll';
import TrackingCode from '@/components/common/tracking-code';
import Providers from '@/components/context/compose/Providers';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import '@/styles/global.scss';
import { AppConfig } from '@/config/AppConfig';

export const metadata = {
	...(process.env.NEXT_PUBLIC_BASE_URL
		? {
				metadataBase: new URL(AppConfig.getBaseUrl()),
				openGraph: {
					title: AppConfig.title,
					description: AppConfig.description,
					url: AppConfig.getBaseUrl(),
					siteName: AppConfig.title,
					images: [
						{
							url: AppConfig.getBaseUrl('/share.webp'), // Must be an absolute URL
							width: 1200,
							height: 630,
						},
					],
					locale: AppConfig.locale,
					type: 'website',
				},
			}
		: {}),
	title: {
		default: AppConfig.title,
		template: `%s | ${AppConfig.title}`,
	},
	description: AppConfig.description,

	icons: AppConfig.icons,

	robots: {
		follow: true,
		index: true,
	},
};
export default async function LocaleLayout({
	children,
	params,
}: {
	children: React.ReactNode;
	params: Promise<{ locale: string }>;
}) {
	// Ensure that the incoming `locale` is valid
	const { locale } = await params;
	if (!routing.locales.includes(locale as any)) {
		notFound();
	}

	// Providing all messages to the client
	// side is the easiest way to get started
	const messages = await getMessages();

	return (
		<html lang={locale}>
			<body>
				<TrackingCode />
				<NextIntlClientProvider messages={messages}>
					<Providers>
						<LenisScroll>{children}</LenisScroll>
					</Providers>
				</NextIntlClientProvider>
			</body>
		</html>
	);
}
