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
	listID,
}: UpdateListRequest): Promise<AxiosResponse<UpdateListResponse>> {
	const config: AxiosRequestConfig = {
		url: `${process.env.BASE_URL}/list/update/${action}?listID=${listID}`,
		method: 'POST',
		data: {
			newName,
			word,
		},
	};
	return axios.request<UpdateListResponse>(config);
}
