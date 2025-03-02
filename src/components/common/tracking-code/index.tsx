import FacebookPixel from '@/components/common/tracking-code/FacebookPixel';
import { fbPixelIds, gaIds, gtmIds } from '@/components/common/tracking-code/helper';
import TrackingCodeClient from '@/components/common/tracking-code/TrackingCodeClient';
import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google';
import React from 'react';

interface ITrackingCodeWarp {
	children?: React.ReactNode;
}

export default function TrackingCode({ children }: ITrackingCodeWarp) {
	const list = [
		...gaIds.map((code) => ({
			code,
			type: 'GA',
		})),
		...gtmIds.map((code) => ({
			code,
			type: 'GTM',
		})),
		...fbPixelIds.map((code) => ({
			code,
			type: 'FACEBOOK_PIXEL',
		})),
	];

	return (
		<>
			{list?.map((item, index) => {
				const action = {
					['GA']: <GoogleAnalytics key={index} gaId={item.code} />,
					['GTM']: <GoogleTagManager key={index} gtmId={item.code} />,
					['FACEBOOK_PIXEL']: <FacebookPixel key={index} fbId={item.code} />,
				}[item?.type];

				if (action) return action;
				return null;
			})}

			<TrackingCodeClient />

			{children}
		</>
	);
}
