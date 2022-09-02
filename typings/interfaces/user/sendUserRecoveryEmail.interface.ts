export interface SendUserRecoveryRequest{
    email?:string;
    username?:string;
}

export interface SendUserRecoveryResponse{
    success:boolean;
    data:{
        message:string;
    }
}