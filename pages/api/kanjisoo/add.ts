import { NextApiRequest, NextApiResponse } from "next";

export default async function kanjiAdd(
	req: NextApiRequest,
	res: NextApiResponse
) {
	try {
		res.status(200).json({
			success: true,
			method: req.method,
			endpoint: req.url,
		});
	} catch (error) {
		console.log(error);
	}
}
