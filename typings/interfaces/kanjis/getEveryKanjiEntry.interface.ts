import { KanjiEntry } from "./kanjiList.interface";

export interface GetEveryKanjiResponse{
    success:boolean;
    message?:string;
    data:KanjiEntry[];
};