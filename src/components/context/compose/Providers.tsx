'use client';

import dynamic from 'next/dynamic';
const Compose = dynamic(() => import('@/components/context/compose/Compose'), {
	ssr: false,
});
const LoadingGate = dynamic(() => import('@/components/context/LoadingGate'), {
	ssr: false,
});
const StorageContext = dynamic(() => import('@/components/context/StorageProvider'), { ssr: false });
const Providers = ({ children, ...props }: any) => {
	return (
		<Compose components={[LoadingGate, StorageContext]} {...props}>
			{children}
		</Compose>
	);
};

export default Providers;
