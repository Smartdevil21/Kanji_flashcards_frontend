import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import {
	GetAllKanjisByLevelResponse,
	GetAllKanjisByLevelRequest,
} from "../../interfaces/kanjis/getAllKanjisByLevel.interface";

export function getAllKanjisByLevel({
	cardListName,
}: GetAllKanjisByLevelRequest): Promise<
	AxiosResponse<GetAllKanjisByLevelResponse>
> {
	const config: AxiosRequestConfig = {
		url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/kanji/level?l=${cardListName}`,
		method: "GET",
	};
	return axios.request<GetAllKanjisByLevelResponse>(config);
}
