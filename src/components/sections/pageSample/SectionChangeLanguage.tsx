import { Link, usePathname } from '@/i18n/navigation';
import { useFormatter, useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { FC } from 'react';

const SectionChangeLanguage: FC<any> = () => {
	const t = useTranslations('HomePage');
	const pathname = usePathname();
	const locale = useParams().locale;
	console.log('locale', locale);

	const format = useFormatter();
	const dateTime = new Date();

	return (
		<div className="SectionChangeLanguage">
			<Link href={`/${pathname}`} locale="en">
				<h1 className="duration-300">{t('tieng-anh')}</h1>
			</Link>
			<Link href={`/${pathname}`} locale="vi">
				<h1 className="duration-300">{t('tieng-viet')}</h1>
			</Link>
			<div className="duration-300">{`Time ${format.dateTime(dateTime, {
				year: 'numeric',
				month: '2-digit',
				day: '2-digit',
				hour: '2-digit',
				minute: '2-digit',
			})}`}</div>

			{/* <div className="duration-300">{`${format.number(1234.56, {
				style: 'currency',
				currency: 'USD',
				currencyDisplay: 'symbol', // or "name", "code"
			})}`}</div> */}
		</div>
	);
};

export default SectionChangeLanguage;
