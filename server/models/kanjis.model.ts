// import { Model } from "mongoose";
import mongoose, { Model, Schema } from "mongoose";

// let Kanji!: {
// 	[x: string]: any;
// };

export const kanjiSchema: Schema = new mongoose.Schema({
	word: {
		type: String,
		unique: true,
	},
	meaning: String,
	on_reading: {
		reading: String,
		example: {
			eg: String,
			meaning: String,
			pronounciation: String,
		},
	},
	kun_reading: {
		reading: String,
		example: {
			eg: String,
			meaning: String,
			pronounciation: String,
		},
	},
	level: Number,
});

const Kanji = mongoose.model("kanji", kanjiSchema);

module.exports = Kanji;
