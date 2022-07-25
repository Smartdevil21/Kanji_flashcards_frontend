import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import {
	GetAllKanjisByLevelResponse,
	GetAllKanjisByLevelRequest,
} from '../../interfaces/kanjis/getAllKanjisByLevel.interface';

export function getAllKanjisByLevel({
	level,
}: GetAllKanjisByLevelRequest): Promise<
	AxiosResponse<GetAllKanjisByLevelResponse>
> {
	const config: AxiosRequestConfig = {
		url: `${process.env.BASE_URL}/kanjis?level=${level}`,
		method: 'GET',
	};
	return axios.request<GetAllKanjisByLevelResponse>(config);
}
