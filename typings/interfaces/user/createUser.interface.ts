export interface CreateUserRequest {
	username: string;
	email: string;
	password: string;
}

interface ResponseData {
	username: string;
	emailVerified: boolean;
	email: string;
	password: string;
	_id: string;
	lists: string[];
	__v: number;
}

export interface CreateUserResponse {
	success: boolean;
	data: ResponseData;
}
