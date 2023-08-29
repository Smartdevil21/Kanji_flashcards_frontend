interface Reading {
	example: {
		eg: string;
		meaning: string;
		pronounciation: string;
	};
	reading: string;
}

export interface KanjiEntry {
	_id: string;
	__v: number;
	meaning: string;
	word: string;
	level: string;
	on_reading: Reading;
	kun_reading: Reading;
}

export type Kanji = Omit<KanjiEntry, "_id" | "__v">;
