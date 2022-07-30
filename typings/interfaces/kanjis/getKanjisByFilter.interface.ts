import { KanjiEntry } from "./kanjiList.interface";

export interface GetKanjisByFilterRequest {
	level?: string[];
	items?: string[];
}



export interface GetKanjisByFilterResponse {
	success: boolean;
    data: KanjiEntry[];
}
