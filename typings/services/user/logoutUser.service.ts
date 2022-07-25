import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { LogoutUserResponse } from '../../interfaces/user/logoutUser.interface';

export function logoutUser(): Promise<AxiosResponse<LogoutUserResponse>> {
	const config: AxiosRequestConfig = {
		url: `${process.env.BASE_URL}`,
		method: 'GET',
	};
	return axios.request<LogoutUserResponse>(config);
};