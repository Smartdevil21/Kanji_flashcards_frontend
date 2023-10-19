import React, { FormEvent, FormEventHandler, useState } from "react";
import {
	TextField,
	Container,
	Box,
	Stack,
	IconButton,
	Typography,
	CircularProgress,
} from "@mui/material";
import { KanjiEntry } from "../../typings/interfaces/kanjis/kanjiList.interface";
import Parent from "../../components/parent/Parent";
import { Icon } from "@iconify/react";
import axios from "axios";

function Item({ kanjiEntry }: { kanjiEntry?: KanjiEntry }) {
	return (
		<Stack
			direction={"column"}
			gap={1}
			sx={{ padding: 2, background: "#e5e5e5" }}
		>
			<span>
				<Typography variant="h6">Word:</Typography>
				<Typography>{kanjiEntry?.word}</Typography>
			</span>
			<span>
				<Typography variant="h6">Meaning:</Typography> {""}{" "}
				<Typography>{kanjiEntry?.meaning}</Typography>
			</span>
			<Typography variant="h4">On Reading</Typography>
			<span>
				<Typography variant="h6">Reading:</Typography> {""}{" "}
				<Typography>{kanjiEntry?.on_reading?.reading}</Typography>
			</span>
			{/* <Typography variant="h5">Example</Typography> */}
			<span>
				<Typography variant="h6">EG:</Typography> {""}{" "}
				<Typography>
					{kanjiEntry?.on_reading?.example?.eg} [
					{kanjiEntry?.on_reading?.example?.pronounciation}]{" "}
					{kanjiEntry?.on_reading?.example?.meaning}
				</Typography>
			</span>
			{/* <span>
				 <Typography variant="h6">Pronounciation:</Typography> {""}{" "}
				<Typography>
					{kanjiEntry?.on_reading?.example?.pronounciation}
				</Typography>
			</span>
			<span>
				<Typography variant="h6">Meaning:</Typography> {""}{" "}
				<Typography>
					{kanjiEntry?.on_reading?.example?.meaning}
				</Typography>
			</span> */}
			<Typography variant="h4">Kun Reading</Typography>
			<span>
				<Typography variant="h6">Reading:</Typography> {""}{" "}
				<Typography>{kanjiEntry?.kun_reading?.reading}</Typography>
			</span>
			{/* <Typography variant="h5">Example</Typography> */}
			<span>
				<Typography variant="h6">EG:</Typography> {""}{" "}
				<Typography>
					{kanjiEntry?.kun_reading?.example?.eg} [
					{kanjiEntry?.kun_reading?.example?.pronounciation}]{" "}
					{kanjiEntry?.kun_reading?.example?.meaning}
				</Typography>
			</span>
			{/* <span>
				<Typography variant="h6">Pronounciation:</Typography> {""}{" "}
				<Typography>
					{kanjiEntry?.kun_reading?.example?.pronounciation}
				</Typography>
			</span>
			<span>
				<Typography variant="h6">Meaning:</Typography> {""}{" "}
				<Typography>
					{kanjiEntry?.kun_reading?.example?.meaning}
				</Typography>
			</span> */}
		</Stack>
	);
}

function Search() {
	const [search, setSearch] = useState("");
	const [loading, setLoading] = useState(false);
	const [results, setResults] = useState<KanjiEntry[]>([]);

	const handleSubmit = async () => {
		setLoading(true);
		try {
			const res = await axios.post(
				`${process.env.NEXT_PUBLIC_BASE_URL}/api/kanji/searchAll`,
				{ search }
			);
			setResults(res.data.data);
		} catch (error: any) {
			alert(
				error.response.data.message ||
					error.message ||
					"Something went wrong. Please try again!"
			);
			console.log(error);
		}
		setLoading(false);
	};

	return (
		<Parent>
			<Box
				sx={{
					overflowX: "scroll",
					width: "100%",
					height: "90vh",
					overflowY: "scroll",
				}}
				padding={{ md: 5, xs: 2 }}
			>
				<Stack direction={"row"} mb={2}>
					<form
						onSubmit={(e) => {
							e.preventDefault();
							handleSubmit();
						}}
					>
						<TextField
							size="small"
							value={search}
							onChange={(e) => {
								setSearch(e.target.value);
							}}
							prefix={"lol"}
						/>
						<IconButton type="submit" disabled={loading}>
							{!loading ? (
								<Icon icon="material-symbols:search" />
							) : (
								<CircularProgress size={"small"} />
							)}
						</IconButton>
					</form>
				</Stack>
				<Stack direction={"column"} gap={4}>
					{!loading && results?.length ? (
						results?.map((result, index) => (
							<Item key={result._id} kanjiEntry={result} />
						))
					) : (
						<Typography>
							No entries found for your search &apos;{search}
							&apos;
						</Typography>
					)}
				</Stack>
			</Box>
		</Parent>
	);
}

export default Search;
