import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { CreateListResponse } from '../../interfaces/lists/createList.interface';

export function createList(): Promise<AxiosResponse<CreateListResponse>> {
	const config: AxiosRequestConfig = {
		url: `${process.env.BASE_URL}/list/create`,
		method: 'GET',
	};
	return axios.request<CreateListResponse>(config);
}
