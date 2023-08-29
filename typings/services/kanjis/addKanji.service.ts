import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { GetEveryKanjiResponse } from "../../interfaces/kanjis/getEveryKanjiEntry.interface";
import { Kanji, KanjiEntry } from "../../interfaces/kanjis/kanjiList.interface";

export function addKanji(
	kanji: Kanji
): Promise<AxiosResponse<GetEveryKanjiResponse>> {
	const config: AxiosRequestConfig = {
		url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/kanji/add`,
		method: "POST",
		data: kanji,
	};
	return axios.request<GetEveryKanjiResponse>(config);
}
