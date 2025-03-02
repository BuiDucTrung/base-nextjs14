'use client';
import { Link } from '@/i18n/navigation';
import { FC } from 'react';

// import {useTranslations} from 'next-intl';
const PageHomeSection: FC<any> = (props) => {


	return <Link href={'/samples'}> {`Click here to redirect to samples page to checkout samples`}</Link>;
};

export default PageHomeSection;
