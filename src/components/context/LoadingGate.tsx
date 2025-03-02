import { createContext, useContext, useMemo, useState } from 'react';

export interface IContextLoading {
	isLoading: boolean;
	setIsLoading: (props: any) => void;
}

const defaultValue = {} as any;

export const LoadingGateContext = createContext<IContextLoading>(defaultValue);

export default function LoadingGate({ children, ...props }: any) {
	const [isLoading, setIsLoading] = useState(false);
	const loader = useMemo(() => {
		if (isLoading)
			return (
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
						{/* <LoadingSpinner size={60} /> */}
						Loading....
					</div>
				</>
			);

		return <></>;
	}, [isLoading]);
	return (
		<LoadingGateContext.Provider value={{ isLoading, setIsLoading }} {...props}>
			{children}
			{loader}
		</LoadingGateContext.Provider>
	);
}

export function useLoadingGate() {
	const context = useContext(LoadingGateContext);
	if (context === undefined) {
		throw new Error('useLoadingGate must be used within a LoadingGate');
	}
	return context;
}
