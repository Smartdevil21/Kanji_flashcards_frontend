import { KanjiEntry } from "./kanjiList.interface";

export interface SearchKanjiByWordRequest{
    keyword:string;
};

export interface SearchKanjiByWordResponse{
    success:boolean;
    data: KanjiEntry[];
};