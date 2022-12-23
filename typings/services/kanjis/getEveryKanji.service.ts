import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { GetEveryKanjiResponse } from "../../interfaces/kanjis/getEveryKanjiEntry.interface";

export function getEveryKanji(): Promise<AxiosResponse<GetEveryKanjiResponse>> {
	const config: AxiosRequestConfig = {
		url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/kanji/all-kanjis`,
		method: "GET",
	};
	return axios.request<GetEveryKanjiResponse>(config);
}
