export interface LoginUserRequest {
	username: string;
	password: string;
}

interface Data {
	_id: string;
	__v: number;
	username: string;
	emailVerified: boolean;
	email: string;
	password: string;
}

export interface LoginUserResponse {
	success: boolean;
	data?: Data;
}
