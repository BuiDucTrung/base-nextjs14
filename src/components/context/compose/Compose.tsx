'use client';

import { ReactNode } from 'react';

export interface IComposeProps {
	children: ReactNode;
	components: Array<ReactNode>;
}

export default function Compose(props: IComposeProps) {
	const { children, components = [], ...rest } = props;
	return (
		<>
			{components.reduceRight(
				(acc: ReactNode, ProviderComponent: any, index: number) => (
					<ProviderComponent {...rest} key={index + 'provider'}>
						{acc}
					</ProviderComponent>
				),
				children
			)}
		</>
	);
}
