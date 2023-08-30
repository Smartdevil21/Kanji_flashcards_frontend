import { useRouter } from "next/router";
import React, { useEffect, useState, useContext, FormEvent } from "react";
import { StatesContext } from "../../_app";
import Styles from "../../../styles/add/kanjis/addKanjis.module.scss";
import { Button, TextField } from "@mui/material";
import Parent from "../../../components/parent/Parent";
import axios from "axios";
import { addKanji } from "../../../typings/services/kanjis/addKanji.service";
import { Kanji } from "../../../typings/interfaces/kanjis/kanjiList.interface";
import { defaultKanji } from "../../../typings/interfaces/kanjis/kanji.interface";

function AddKanjisPage() {
	const router = useRouter();
	const [loading, setLoading] = useState(false);
	const { states } = useContext(StatesContext);
	const [wordData, setWordData] = useState<Kanji>(defaultKanji);

	const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
		setLoading(true);
		e.preventDefault();
		try {
			const result = await addKanji(wordData);
			setWordData(defaultKanji);
			console.log(result);
		} catch (error) {
			console.log("Err in adding kanjis:", error);
		}
		setLoading(false);
	};

	useEffect(() => {
		if (states.uid !== process.env.NEXT_PUBLIC_SUPER_ADMIN_ID)
			router.push("/login");
	}, []);
	return (
		<Parent>
			<form
				className={Styles.add_kanjis_page}
				onSubmit={handleFormSubmit}
			>
				<TextField
					label={"Level"}
					size={"small"}
					value={wordData.level}
					onChange={(e) => {
						setWordData((prev) => ({
							...prev,
							level: e.target.value,
						}));
					}}
				/>
				<TextField
					label={"Word"}
					size={"small"}
					value={wordData.word}
					onChange={(e) => {
						setWordData((prev) => ({
							...prev,
							word: e.target.value,
						}));
					}}
				/>
				<TextField
					label={"Meaning"}
					size={"small"}
					value={wordData.meaning}
					onChange={(e) => {
						setWordData((prev) => ({
							...prev,
							meaning: e.target.value,
						}));
					}}
				/>
				<br />
				<div className={Styles.on_reading_example}>
					<h2>On-Reading Data</h2>
					<TextField
						label={"On-Reading"}
						size={"small"}
						value={wordData.on_reading.reading}
						onChange={(e) => {
							setWordData((prev) => ({
								...prev,
								on_reading: {
									...prev.on_reading,
									reading: e.target.value,
								},
							}));
						}}
					/>
					<span>
						<b>Example:</b>
					</span>
					<TextField
						label={"E.G."}
						size={"small"}
						value={wordData.on_reading.example.eg}
						onChange={(e) => {
							setWordData((prev) => ({
								...prev,
								on_reading: {
									...prev.on_reading,
									example: {
										...prev.on_reading.example,
										eg: e.target.value,
									},
								},
							}));
						}}
					/>
					<TextField
						label={"Meaning"}
						size={"small"}
						value={wordData.on_reading.example.meaning}
						onChange={(e) => {
							setWordData((prev) => ({
								...prev,
								on_reading: {
									...prev.on_reading,
									example: {
										...prev.on_reading.example,
										meaning: e.target.value,
									},
								},
							}));
						}}
					/>
					<TextField
						label={"Pronounciation"}
						size={"small"}
						value={wordData.on_reading.example.pronounciation}
						onChange={(e) => {
							setWordData((prev) => ({
								...prev,
								on_reading: {
									...prev.on_reading,
									example: {
										...prev.on_reading.example,
										pronounciation: e.target.value,
									},
								},
							}));
						}}
					/>
				</div>
				<br />
				<div className={Styles.kun_reading_example}>
					<h2>Kun-Reading Data</h2>
					<TextField
						label={"Kun-Reading"}
						size={"small"}
						value={wordData.kun_reading.reading}
						onChange={(e) => {
							setWordData((prev) => ({
								...prev,
								kun_reading: {
									...prev.kun_reading,
									reading: e.target.value,
								},
							}));
						}}
					/>
					<span>
						<b>Example:</b>
					</span>
					<TextField
						label={"E.G."}
						size={"small"}
						value={wordData.kun_reading.example.eg}
						onChange={(e) => {
							setWordData((prev) => ({
								...prev,
								kun_reading: {
									...prev.kun_reading,
									example: {
										...prev.kun_reading.example,
										eg: e.target.value,
									},
								},
							}));
						}}
					/>
					<TextField
						label={"Meaning"}
						size={"small"}
						value={wordData.kun_reading.example.meaning}
						onChange={(e) => {
							setWordData((prev) => ({
								...prev,
								kun_reading: {
									...prev.kun_reading,
									example: {
										...prev.kun_reading.example,
										meaning: e.target.value,
									},
								},
							}));
						}}
					/>
					<TextField
						label={"Pronounciation"}
						size={"small"}
						value={wordData.kun_reading.example.pronounciation}
						onChange={(e) => {
							setWordData((prev) => ({
								...prev,
								kun_reading: {
									...prev.kun_reading,
									example: {
										...prev.kun_reading.example,
										pronounciation: e.target.value,
									},
								},
							}));
						}}
					/>
				</div>
				<Button type="submit" disabled={loading}>
					{loading ? "Loading" : "Add kanji"}
				</Button>
			</form>
		</Parent>
	);
}

export default AddKanjisPage;
