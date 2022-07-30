interface Data {
	_id: string;
	__v: number;
	username: string;
	emailVerified: boolean;
	email: string;
	password: string;
}

export interface LoginWithTokenRequest{
	token:string
}

export interface LoginWithTokenResponse{
    success: boolean;
	data?: Data;
	t?:string;
}