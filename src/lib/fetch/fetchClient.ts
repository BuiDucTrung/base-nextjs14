import { toFormData, toQueryString } from '@/lib/fetch';
import axios, { AxiosRequestConfig, AxiosResponse, RawAxiosRequestHeaders } from 'axios';
export interface FetchResponse {
	code?: number | unknown;
	status: number;
	data?: any;
	error?: boolean;
	message?: string;
	query?: any;
}

export interface IFetch {
	path: string;
	data?: any;
	headers?: RawAxiosRequestHeaders;
	method?: string;
	contentType?: 'multipart/form-data' | 'application/json' | 'application/x-www-form-urlencoded';
}
export default async function fetchClient({
	path,
	data,
	headers,
	method = 'GET',
	contentType = 'application/json',
}: IFetch): Promise<FetchResponse> {
	const config: AxiosRequestConfig = {
		url: path,
		method,
		headers: {
			'Content-Type': contentType,
			...headers,
		},
	};

	try {
		switch (contentType) {
			case 'application/json':
				config.data = data;
				break;
			case 'application/x-www-form-urlencoded':
				{
					const form = toFormData(data);
					config.data = toQueryString(form);
				}
				break;
			case 'multipart/form-data':
				delete config.headers?.['Content-Type'];
				config.data = data;
				break;
			default:
				break;
		}

		const result: AxiosResponse = await axios(config);

		const response: FetchResponse = {
			status: result?.status == 200,
			data: result?.data?.metadata,
			...result?.data,
		};

		delete (response as any).metadata;
		return response;
	} catch (e) {
		console.log('path :>> ', path);
		console.log(JSON.stringify(config, null, 2));

		if ((e as any)?.response) {
			try {
				const responseData = (e as any)?.response.data;
				console.log('responseData :>> ', responseData);

				return {
					status: responseData.status === 'success' || responseData.status === true ? 1 : 0,
					data: responseData.metadata,
					...responseData,
				};
			} catch (error) {
				throw new Error(`${error instanceof Error ? error.message : 'Unknown error'}`, {
					cause: (e as any)?.response.status,
				});
			}
		}
		return {
			code: e instanceof Error && 'cause' in e ? e.cause : 0,
			status: 0,
			error: true,
			message: `${e instanceof Error ? e.message : 'Vui lòng thử lại sau'}`,
			query: data,
		};
	}
}
