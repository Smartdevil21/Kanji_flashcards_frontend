import axios, { AxiosResponse, AxiosRequestConfig } from "axios";
import {
	FeedbackRequest,
	FeedbackResponse,
} from "../../interfaces/feedback/feedback.interface";

export function feedback({
	username,
	email,
	message,
}: FeedbackRequest): Promise<AxiosResponse<FeedbackResponse>> {
	const config: AxiosRequestConfig = {
		url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/feedback`,
		method: "POST",
		data: {
			username,
			email,
			message,
		},
	};
	return axios.request<FeedbackResponse>(config);
}
