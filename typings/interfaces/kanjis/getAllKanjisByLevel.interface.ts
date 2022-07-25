interface Kanji{
    on_reading?:{
        example?:{
            eg?:string;
            meaning?:string;
            pronounciation?:string;
        };
        reading?:string;
    },
    kun_reading?:{
        example?:{
            eg?:string;
            meaning?:string;
            pronounciation?:string;
        };
        reading?:string;
    },
    _id:string;
    word:string;
    level:number;
    __v:number
}

export interface GetAllKanjisByLevelResponse{
    success:boolean;
    level:string;
    data:Kanji[];
};

export interface GetAllKanjisByLevelRequest{
    level:string
}