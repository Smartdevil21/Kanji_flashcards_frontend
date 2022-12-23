import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import {
	GetKanjisByFilterRequest,
	GetKanjisByFilterResponse,
} from "../../interfaces/kanjis/getKanjisByFilter.interface";

export function getKanjisByFilter({
	level,
	items,
}: GetKanjisByFilterRequest): Promise<
	AxiosResponse<GetKanjisByFilterResponse>
> {
	const config: AxiosRequestConfig = {
		url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/kanji/filter`,
		method: "POST",
		data: {
			level,
			items,
		},
	};
	return axios.request<GetKanjisByFilterResponse>(config);
}
