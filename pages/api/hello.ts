import { NextApiRequest, NextApiResponse } from "next";

export default async function sayHello(
	req: NextApiRequest,
	res: NextApiResponse
) {
	res.status(200).json({
		success: true,
		method: req.method,
	});
}
