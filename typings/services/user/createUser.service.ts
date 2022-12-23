import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import {
	CreateUserRequest,
	CreateUserResponse,
} from "../../interfaces/user/createUser.interface";

export function createUser({
	username,
	email,
	password,
}: CreateUserRequest): Promise<AxiosResponse<CreateUserResponse>> {
	const config: AxiosRequestConfig = {
		url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/autj/signup`,
		method: "POST",
		data: {
			username,
			email,
			password,
		},
	};
	return axios.request<CreateUserResponse>(config);
}
