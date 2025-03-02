'use client';

import { capitalizeName, gaIds, gaPage, makeSlug } from '@/components/common/tracking-code/helper';

import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';
import React, { useEffect } from 'react';

interface ITrackingCodeClient {
	children?: ReactNode;
}

export default function TrackingCodeClient({ children, ...props }: ITrackingCodeClient) {
	const pathname = usePathname();

	useEffect(() => {
		gaPage(pathname, capitalizeName(makeSlug(pathname)) || 'Home Page');
	}, [pathname]);

	return <></>;
}
