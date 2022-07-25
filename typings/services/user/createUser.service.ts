import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import {
	CreateUserRequest,
	CreateUserResponse,
} from '../../interfaces/user/createUser.interface';

export function createUser({
	username,
	email,
	password,
}: CreateUserRequest): Promise<AxiosResponse<CreateUserResponse>> {
	const config: AxiosRequestConfig = {
		url: `${process.env.BASE_URL}/user/create-account`,
		method: 'POST',
		data: {
			username,
			email,
			password,
		},
	};
	return axios.request<CreateUserResponse>(config);
}
