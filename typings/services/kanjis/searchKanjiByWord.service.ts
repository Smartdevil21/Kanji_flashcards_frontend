import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import {
	SearchKanjiByWordRequest,
	SearchKanjiByWordResponse,
} from "../../interfaces/kanjis/searchKanjiByWord.interce";

export function searchKanjiByWord({
	keyword,
}: SearchKanjiByWordRequest): Promise<
	AxiosResponse<SearchKanjiByWordResponse>
> {
	const config: AxiosRequestConfig = {
		url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/kanji/search`,
		method: "POST",
		data: {
			keyword,
		},
	};
	return axios.request<SearchKanjiByWordResponse>(config);
}
