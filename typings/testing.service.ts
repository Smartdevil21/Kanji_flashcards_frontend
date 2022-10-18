import axios, { AxiosResponse, AxiosRequestConfig } from "axios";

interface Response {
	success: boolean;
	method: string;
}

export default function testService(): Promise<AxiosResponse<Response>> {
	const config: AxiosRequestConfig = {
		url: `/api/hello`,
		method: "POST",
	};
	return axios.request<Response>(config);
}
