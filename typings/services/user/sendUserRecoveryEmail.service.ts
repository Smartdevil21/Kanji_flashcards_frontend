import {
	SendUserRecoveryRequest,
	SendUserRecoveryResponse,
} from "../../interfaces/user/sendUserRecoveryEmail.interface";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

export function sendUserRecoveryEmail({
	email,
	username,
}: SendUserRecoveryRequest): Promise<AxiosResponse<SendUserRecoveryResponse>> {
	const config: AxiosRequestConfig = {
		url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/recovery`,
		method: "POST",
		data: {
			email,
			username,
		},
	};
	return axios.request<SendUserRecoveryResponse>(config);
}
