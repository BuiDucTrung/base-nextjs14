'use client';

import ErrorTemplate from '@/app/[locale]/err/_component/ErrorTemplate';

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
	return <ErrorTemplate />;
}
