'use server';
import fetchClient, { FetchResponse, IFetch } from '@/lib/fetch/fetchClient';
import { cookies } from 'next/headers';

export async function fetchServer({ path, ...rest }: IFetch): Promise<FetchResponse> {
	// Lấy token từ cookie
	const token = cookies().get('token')?.value ?? null;

	const res = await fetchClient({
		...(token
			? {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			: {}),
		path,
		...rest,
	});

	switch (res.code ? +res.code : 0) {
		case 401:
			return {
				status: 1,
				data: { needRefreshToken: true },
			};
			break;

		case 403:
			return {
				status: 1,
				data: { needLogout: true },
			};
			break;

		default:
			break;
	}
	return res;
}
