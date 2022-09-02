export interface ChangePasswordRequest{
    uid:string;
    updatedPass:string;
};

export interface ChangePasswordResponse{
    success:boolean;
    data:{
        message:string;
    }
}