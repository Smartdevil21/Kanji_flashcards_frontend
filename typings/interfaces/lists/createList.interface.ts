export interface CreateListResponse {
	success: boolean;
	message?: string;
	data?: {
		userID: string;
		listName: string;
		listItems: string[];
		_id: string;
		__v: number;
	};
}
