import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { CreateListResponse } from "../../interfaces/lists/createList.interface";

interface Props {
	uid: string;
	ln: string;
}

export function createList({
	ln,
	uid,
}: Props): Promise<AxiosResponse<CreateListResponse>> {
	const config: AxiosRequestConfig = {
		url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/lists/create?uid=${uid}&ln=${ln}`,
		method: "GET",
	};
	return axios.request<CreateListResponse>(config);
}
