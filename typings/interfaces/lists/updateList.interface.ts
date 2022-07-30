export interface UpdateListRequest{
    word?:string;
    newName?:string;
    listName:string;
    action: 'add'|'deleteItem'|'changeName'|'deleteList';
    uid?:string;
};

export interface UpdateListResponse{
    success:boolean;
    data?:{
        _id:string;
        userID: string;
        listName:string;
        listItems:string[];
        __v:number;
    };
    message?:string
}