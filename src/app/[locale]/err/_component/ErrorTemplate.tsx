/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { useRouter } from 'next/navigation';
import type { ReactNode } from 'react';
import React from 'react';

interface IErrorTemplate {
	children?: ReactNode;
	error?: string;
}

export default function ErrorTemplate({ children, error, ...props }: IErrorTemplate) {
	const router = useRouter();

	return (
		<main className="main-root flex min-h-[120px] flex-col items-center justify-center bg-gradient-to-b from-[#23496d] to-[#15162c] text-center leading-[20px] text-white">
			<h2 className="text-[16px]"> {error ?? 'Vui lòng thử lại!'} </h2>

			<button onClick={() => router.replace('/')}>Về Trang Chủ</button>
		</main>
	);
}
