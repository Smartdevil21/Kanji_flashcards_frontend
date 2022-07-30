import { KanjiEntry } from "./kanjiList.interface";

export interface GetAllKanjisByLevelResponse{
    success:boolean;
    level:string;
    data:KanjiEntry[];
};

export interface GetAllKanjisByLevelRequest{
    level:string
}