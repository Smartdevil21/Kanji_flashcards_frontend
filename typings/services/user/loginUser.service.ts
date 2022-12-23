import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import {
	LoginUserRequest,
	LoginUserResponse,
} from "../../interfaces/user/loginUser.interface";

export function loginUser({
	password,
	username,
}: LoginUserRequest): Promise<AxiosResponse<LoginUserResponse>> {
	const config: AxiosRequestConfig = {
		url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/login`,
		method: "POST",
		data: {
			username,
			password,
		},
	};
	return axios.request<LoginUserResponse>(config);
}
