import {
	useState,
	Dispatch,
	SetStateAction,
	useEffect,
	useContext,
	ChangeEvent,
} from "react";
import {
	TextField,
	Container,
	Box,
	Stack,
	IconButton,
	Typography,
	CircularProgress,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
} from "@mui/material";
import { KanjiEntry } from "../../typings/interfaces/kanjis/kanjiList.interface";
import Parent from "../../components/parent/Parent";
import { Icon } from "@iconify/react";
import axios from "axios";
import { StatesContext } from "../_app";
import { updateList } from "../../typings/services/lists/updateList.service";

function Item({ kanjiEntry }: { kanjiEntry: KanjiEntry }) {
	const { states, setStates } = useContext(StatesContext);
	const [bookmarking, setBookmarking] = useState(false);
	const [wordList, setWordList] = useState<KanjiEntry[]>([]);
	async function addToList({
		listName,
	}: {
		listName: string;
	}): Promise<void> {
		setBookmarking(true);
		try {
			const response = await updateList({
				word: kanjiEntry.word,
				action: "add",
				uid: states.uid,
				listName,
			});
			const activeList = states.lists.filter(
				(ele) => ele.listName === listName
			)[0];
			activeList.listItems.push(kanjiEntry.word);
			setStates((prev) => ({
				...prev,
				lists: prev.lists
					.filter((ele) => ele.listName !== listName)
					.concat([activeList]),
			}));
		} catch (error) {
			console.log(error);
		}
		setBookmarking(false);
	}
	return (
		<Stack
			direction={"column"}
			gap={1}
			sx={{ padding: 2, background: "#e5e5e5" }}
		>
			<Stack
				direction={"row"}
				justifyContent={"space-between"}
				alignItems={"flex-start"}
			>
				<span>
					<Typography variant="h6">Word:</Typography>
					<Typography>{kanjiEntry?.word}</Typography>
				</span>
				<Box>
					{states.email_verified && states.userLoggedIn && (
						<>
							{bookmarking ? (
								<CircularProgress
									style={{
										color: "var(--orange)",
										marginRight: "20px",
									}}
								/>
							) : (
								<FormControl fullWidth>
									<InputLabel id="demo-simple-select-label">
										Add to
									</InputLabel>
									<Select
										labelId="demo-simple-select-label"
										id="demo-simple-select"
										value={"Choose List"}
										size={"small"}
										label="Add to"
										// onChange={handleChange}
									>
										<MenuItem value={"Choose List"}>
											<span>Choose List</span>
										</MenuItem>
										{states.lists.map((ele, index) => {
											const ifWordExistsInList =
												ele.listItems?.includes(
													kanjiEntry?.word
												);
											return (
												<MenuItem
													key={index}
													sx={
														ifWordExistsInList
															? {
																	backgroundColor:
																		"rgba(255,0,0,0.2)",
																	color: "red",
																	opacity:
																		"0.5",
																	pointerEvents:
																		"none",
																	"&:hover": {
																		backgroundColor:
																			"rgba(255,0,0,0.2)",
																		color: "red",
																	},
															  }
															: {}
													}
													onClick={() => {
														if (
															!ifWordExistsInList
														) {
															addToList({
																listName:
																	ele.listName,
															});
														}
													}}
													value={ele.listName}
												>
													<span>{ele.listName}</span>
												</MenuItem>
											);
										})}
									</Select>
								</FormControl>
							)}
						</>
					)}
				</Box>
			</Stack>
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
	const [msg, setMsg] = useState("");
	const [results, setResults] = useState<KanjiEntry[]>([]);

	const handleSubmit = async () => {
		setLoading(true);
		try {
			const res = await axios.post(
				`${process.env.NEXT_PUBLIC_BASE_URL}/api/kanji/searchAll`,
				{ search }
			);
			setResults(res.data.data);
			if (!res.data.data.length) {
				setMsg(`No results found for ${search}..`);
			}
		} catch (error: any) {
			// alert(
			// 	error.response.data.message ||
			// 		error.message ||
			// 		"Something went wrong. Please try again!"
			// );
			setMsg(
				error.response.data.message ||
					error.message ||
					`No results found for ${search}..`
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
							placeholder="What you want to search?"
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
								<CircularProgress
									style={{
										color: "var(--orange)",
										width: 26,
										height: 26,
									}}
								/>
							)}
						</IconButton>
					</form>
				</Stack>
				<Stack direction={"column"} gap={4}>
					{!loading && results?.length > 0 ? (
						results?.map((result, index) => (
							<Item key={result._id} kanjiEntry={result} />
						))
					) : (
						<Typography>
							{/* No entries found for your search &apos;{search}
							&apos; */}
							{msg}
						</Typography>
					)}
				</Stack>
			</Box>
		</Parent>
	);
}

export default Search;
