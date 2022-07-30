import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import {
	GetUserListsResponse,
	GetUserListsRequest,
} from '../../interfaces/lists/getUserLists.interface';

export function getUserLists({
	uid,
	lns
}: GetUserListsRequest): Promise<AxiosResponse<GetUserListsResponse>> {
	const config: AxiosRequestConfig = {
		url: `${process.env.NEXT_PUBLIC_BASE_URL}/list/userLists`,
		method: 'POST',
		data:{
			lns: lns,
			uid
		}
	};
	return axios.request<GetUserListsResponse>(config);
}
