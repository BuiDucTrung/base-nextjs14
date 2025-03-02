import LoadingSpinner from '@/components/common/LoadingSpinner';
import { createContext, useContext, useState, useTransition } from 'react';

export interface IStorageContext {
	data: any;
	setData: any;
	startTransition: any;
	isPending: boolean;
}
const defaultValue = {} as any;
export const StorageContext = createContext<IStorageContext>(defaultValue);
export default function StorageProvider({ children, ...props }: any) {
	const [data, setData] = useState({});
	const [isPending, startTransition] = useTransition();

	return (
		<StorageContext.Provider value={{ data, setData, startTransition, isPending }} {...props}>
			{children}
			{isPending && (
				<>
					<style global jsx>{`
						body,
						html {
							overflow: hidden;
						}

						body {
							-webkit-overflow-scrolling: touch;
						}
					`}</style>

					<div className="fixed z-[9999] w-full h-full top-0 left-0 bg-black/[.6] flex justify-center items-center">
						<LoadingSpinner size={60} />
					</div>
				</>
			)}
		</StorageContext.Provider>
	);
}

export function useStorage() {
	const context = useContext(StorageContext);
	if (context === undefined) {
		throw new Error('useStorage must be used within a StorageProvider');
	}
	return context;
}
