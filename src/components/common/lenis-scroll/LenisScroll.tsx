'use client';
import { ReactLenis } from 'lenis/react';
import { useEffect, useRef } from 'react';
import type { LenisRef } from 'lenis/react';
import { cancelFrame, frame } from 'framer-motion';
function LenisScroll({ children }: any) {
	const lenisRef = useRef<LenisRef>(null);
	useEffect(() => {
		function update(data: { timestamp: number }) {
			const time = data.timestamp;
			lenisRef.current?.lenis?.raf(time);
		}

		frame.update(update, true);

		return () => cancelFrame(update);
	}, []);

	return (
		<ReactLenis root options={{ autoRaf: false, anchors: true }} ref={lenisRef}>
			{children}
		</ReactLenis>
	);
}

export default LenisScroll;
