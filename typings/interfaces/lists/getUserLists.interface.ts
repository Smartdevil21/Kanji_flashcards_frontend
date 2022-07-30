export interface ListData{
    _id:string;
    userID:string;
    listName:string;
    listItems:string[];
    __v:number;
}

export interface GetUserListsRequest{
    uid:string;
    lns?:string[];
}

export interface GetUserListsResponse{
    success:boolean;
    data: ListData[];
}