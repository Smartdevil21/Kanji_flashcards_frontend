import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import {
	ChangePasswordRequest,
	ChangePasswordResponse,
} from "../../interfaces/user/changePassword.interface";

export function changePassword({
	uid,
	updatedPass,
}: ChangePasswordRequest): Promise<AxiosResponse<ChangePasswordResponse>> {
	const config: AxiosRequestConfig = {
		url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/update-info`,
		method: "POST",
		data: {
			uid,
			updatedPass,
		},
	};
	return axios.request<ChangePasswordResponse>(config);
}
