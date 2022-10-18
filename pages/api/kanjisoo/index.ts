import { NextApiRequest, NextApiResponse } from "next";
// import { connectToDatabase } from "../../../server/configs/db.config";
// import Kanji from "../../../server/models/kanjis.model";

export default async function kanjiFinder(
	req: NextApiRequest,
	res: NextApiResponse
) {
	// try {
	// 	const { db } = await connectToDatabase();
	// 	if (!req.query.level) throw new Error("Level required!");
	// 	const result = await db
	// 		.collection("kanjis")
	// 		.find({ level: req.query.level });
	// 	res.status(200).json({
	// 		success: true,
	// 		level: req.query.level,
	// 		data: result,
	// 	});
	// } catch (e) {
	// 	console.log("Err at GET /kanji: ", e);
	// 	res.status(400).json({ success: false, message: `${e}` });
	// }
}
