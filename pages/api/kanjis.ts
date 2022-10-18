import { NextApiRequest, NextApiResponse } from "next";
const db = require("../../server/configs/db.config");
const Kanjis = require("../../server/models/kanjis.model");

export default async function kanjiFinder(
	req: NextApiRequest,
	res: NextApiResponse
) {
	try {
		if (!req.query.level) throw new Error("Level required!");
		const conn = await db;
		const result = await Kanjis.find();
		res.status(200).json({
			success: true,
			level: req.query.level,
			data: result,
		});
	} catch (e) {
		console.log("Err at GET /kanji: ", e);
		res.status(400).json({ success: false, message: `${e}` });
	}
}
