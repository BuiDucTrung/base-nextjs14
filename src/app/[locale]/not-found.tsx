'use client';

import ErrorTemplate from '@/app/[locale]/err/_component/ErrorTemplate';
import { useRouter } from 'next/navigation';

export default function NotFound() {
	return <ErrorTemplate error={'Không tìm thấy trang!'} />;
}
