import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { request } from 'http';
import {
	UpdateListRequest,
	UpdateListResponse,
} from '../../interfaces/lists/updateList.interface';

export function updateList({
	newName,
	word,
	action,
	listName,
	uid
}: UpdateListRequest): Promise<AxiosResponse<UpdateListResponse>> {
	const config: AxiosRequestConfig = {
		url: `${process.env.NEXT_PUBLIC_BASE_URL}/list/update/${action}?ln=${listName}&uid=${uid}`,
		method: 'POST',
		data: {
			newName,
			word,
		},
	};
	return axios.request<UpdateListResponse>(config);
}
