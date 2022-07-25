export interface FeedbackRequest {
	username: string;
	email: string;
	message: string;
}

export interface FeedbackResponse {
	success: boolean;
	message?: string;
	data?: {
		username: string;
		email: string;
		message: string;
		_id: string;
		__v: number;
	};
}
