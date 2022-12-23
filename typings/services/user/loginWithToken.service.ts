import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import {
	LoginWithTokenResponse,
	LoginWithTokenRequest,
} from "../../interfaces/user/loginWithToken.interface";

export function loginWithToken({
	token,
}: LoginWithTokenRequest): Promise<AxiosResponse<LoginWithTokenResponse>> {
	const config: AxiosRequestConfig = {
		url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/token?t=${token}`,
		method: "GET",
	};
	return axios.request<LoginWithTokenResponse>(config);
}
