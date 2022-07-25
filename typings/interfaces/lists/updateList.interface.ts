export interface UpdateListRequest{
    word?:string;
    newName?:string;
    listID:string;
    action: 'add'|'deleteItem'|'changeName'|'deleteList';
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