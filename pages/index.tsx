import type { NextPage } from "next";
import Styles from "../styles/Home.module.scss";
import Parent from "../components/parent/Parent";
import { Button, CircularProgress, Stack, TextField } from "@mui/material";
import {
	useState,
	Dispatch,
	SetStateAction,
	useEffect,
	useContext,
	ChangeEvent,
} from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Switch from "@mui/material/Switch";
import { getAllKanjisByLevel } from "../typings/services/kanjis/getAllKanjisByLevels.service";
import { KanjiEntry } from "../typings/interfaces/kanjis/kanjiList.interface";
import KanjiCard from "../components/cards/KanjiCard";
import MeaningCard from "../components/cards/MeaningCard";
import { StatesContext } from "./_app";
import { getUserLists } from "../typings/services/lists/getUserLists.service";
import { updateList } from "../typings/services/lists/updateList.service";
import { vibrate } from "../utils/vibrate.helper";
import Alert from "@mui/material/Alert";
import Collapse from "@mui/material/Collapse";
import { getKanjisByFilter } from "../typings/services/kanjis/getKanjisByFilter.service";

const Home: NextPage = () => {
	const { states, setStates } = useContext(StatesContext);
	const [showKanjiCard, setShowKanjiCard] = useState(true);
	const [cardListName, setCardListName] = useState("5");
	const [alert, setAlert] = useState(!states.email_verified);
	const [wordList, setWordList] = useState<KanjiEntry[]>([]);
	const [showRandomKanjis, setShowRandomKanjis] = useState(true);
	const [loading, setLoading] = useState(false);
	const [bookmarking, setBookmarking] = useState(false);
	const [counter, setCounter] = useState({
		pointer: 0,
		history: [0],
	});
	const [bySeq, setBySeq] = useState(true);

	// console.log(`Env: ${process.env.NODE_ENV}`)

	const handleChange = (event: SelectChangeEvent) => {
		vibrate();
		setCounter((prev) => ({ ...prev, pointer: 0 }));
		setCardListName(event.target.value as string);
	};

	//async function for data collection of user from database
	async function getPreLoadDetails(): Promise<void> {
		setLoading(true);
		try {
			// const db = await connectDB();
			if (["1", "2", "3", "4", "5"].includes(cardListName)) {
				const response1 = await getAllKanjisByLevel({ cardListName });
				setWordList(response1.data.data);
			} else {
				const response1 = await getKanjisByFilter({
					items: states.lists.filter(
						(ele) => ele.listName === cardListName
					)[0].listItems,
				});
				setWordList(response1.data.data);
				console.log(cardListName);
			}
			//Here to apply the /list/items request to get the kanjis of the list se;ected by the user.

			// Apply useMemo here!!!
			if (states.userLoggedIn && states.email_verified) {
				const response2 = await getUserLists({
					uid: states.uid as string,
				});
				setStates((prev) => ({ ...prev, lists: response2.data.data }));
				// const response2 = useMemo(async ()=>{
				// 	try {
				// 		const result = await getUserLists({
				// 			uid: states.uid as string,
				// 		});
				// 		setStates((prev) => ({ ...prev, lists: result.data.data }));
				// 		return result;
				// 	} catch (error) {
				// 		console.log(`Can't get the userLists in memo hook in index.tsx. Err: ${error}}`);
				// 	}
				// }, [states.lists]);
			}
		} catch (error) {
			console.log(error);
		}
		setLoading(false);
	}

	async function addToList({
		listName,
	}: {
		listName: string;
	}): Promise<void> {
		setBookmarking(true);
		try {
			const response = await updateList({
				word: wordList[counter.pointer].word,
				action: "add",
				uid: states.uid,
				listName,
			});
			const activeList = states.lists.filter(
				(ele) => ele.listName === listName
			)[0];
			activeList.listItems.push(wordList[counter.pointer].word);
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

	const jumpToIndex = (e: ChangeEvent<HTMLInputElement>) => {
		if (
			Number(e.target.value) >= wordList.length ||
			Number(e.target.value) < 0
		)
			return;
		setCounter((prev) => ({
			...prev,
			pointer: Math.floor(Number(e.target.value)),
		}));
	};

	useEffect(() => {
		getPreLoadDetails();
		return () => {};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [cardListName]);

	return (
		<Parent>
			<div className={Styles.home_container}>
				{loading ? (
					<CircularProgress style={{ color: "var(--orange)" }} />
				) : (
					<>
						{states.userLoggedIn && (
							<>
								<Collapse in={alert}>
									<Alert
										severity="success"
										onClose={() => {
											setAlert(false);
										}}
									>
										Verification Email has been sent
										successfully!
									</Alert>
								</Collapse>
								<br />
							</>
						)}
						<div className={Styles.seqSwitcher}>
							<Stack
								direction={"row"}
								alignItems={"center"}
								spacing={0}
							>
								<label htmlFor="">Show Random Kanjis:</label>
								<Switch
									color="warning"
									checked={showRandomKanjis}
									onChange={(
										e: React.ChangeEvent<HTMLInputElement>
									) => {
										setCounter((prev) => ({
											...prev,
											pointer: 0,
										}));
										setShowRandomKanjis(e.target.checked);
									}}
									inputProps={{ "aria-label": "controlled" }}
								/>
							</Stack>
						</div>
						<Stack
							direction={"row"}
							spacing={1}
							alignItems={"center"}
							style={{ marginBottom: "10px" }}
						>
							<Box sx={{ minWidth: 120 }}>
								<FormControl fullWidth>
									<InputLabel id="demo-simple-select-label">
										Level
									</InputLabel>
									<Select
										labelId="demo-simple-select-label"
										id="demo-simple-select"
										value={cardListName}
										size={"small"}
										label="Age"
										onChange={handleChange}
									>
										<MenuItem value={"5"}>N5</MenuItem>
										<MenuItem value={"4"}>N4</MenuItem>
										{states.lists.map((list, index) => {
											if (list.listItems?.length === 0)
												return;
											return (
												<MenuItem
													key={index}
													value={list.listName}
												>
													{list.listName}
												</MenuItem>
											);
										})}
										{/* <MenuItem value={'3'}>N3</MenuItem>
									<MenuItem value={'2'}>N2</MenuItem>
									<MenuItem value={'1'}>N1</MenuItem> */}
									</Select>
								</FormControl>
							</Box>
							{!showRandomKanjis && (
								<Stack direction={"row"} alignItems={"end"}>
									<FormControl fullWidth>
										<TextField
											style={{ width: 80 }}
											type={"number"}
											value={counter.pointer}
											size={"small"}
											label={"Jump to"}
											onChange={jumpToIndex}
										/>
									</FormControl>

									<strong style={{ marginLeft: 10 }}>
										{" "}
										/{wordList.length - 1}
									</strong>
								</Stack>
							)}
						</Stack>
						{showKanjiCard ? (
							<KanjiCard
								setShowKanjiCard={setShowKanjiCard}
								currentWord={wordList[counter.pointer]}
							/>
						) : (
							<MeaningCard
								setShowKanjiCard={setShowKanjiCard}
								currentWord={wordList[counter.pointer]}
							/>
						)}
						<div className={Styles.card_btns}>
							{!showRandomKanjis && (
								<Button
									disabled={counter.pointer <= 0}
									style={{
										opacity:
											counter.pointer <= 0 ? "0.5" : "1",
									}}
									onClick={() => {
										if (counter.pointer === 0) return;
										vibrate();
										if (!showKanjiCard) {
											setShowKanjiCard(true);
										}
										setCounter((prev) => ({
											...prev,
											pointer: prev.pointer - 1,
										}));
									}}
								>
									Prev
								</Button>
							)}
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
												{states.lists.map(
													(ele, index) => {
														if (
															!ele.listItems?.includes(
																wordList[
																	counter
																		.pointer
																]?.word
															)
														) {
															return (
																<MenuItem
																	key={index}
																	onClick={() => {
																		vibrate();
																		addToList(
																			{
																				listName:
																					ele.listName,
																			}
																		);
																	}}
																	value={
																		ele.listName
																	}
																>
																	<span>
																		{
																			ele.listName
																		}
																	</span>
																</MenuItem>
															);
														}
													}
												)}
											</Select>
										</FormControl>
									)}
								</>
							)}
							<Button
								disabled={
									!showRandomKanjis &&
									counter.pointer == wordList.length - 1
								}
								style={{
									opacity:
										!showRandomKanjis &&
										counter.pointer == wordList.length - 1
											? "0.5"
											: "1",
								}}
								onClick={() => {
									vibrate();
									if (!showKanjiCard) {
										setShowKanjiCard(true);
									}
									setCounter((prev) => ({
										...prev,
										pointer: showRandomKanjis
											? Math.floor(
													Math.random() *
														wordList.length
											  )
											: prev.pointer + 1,
									}));
								}}
							>
								Next
							</Button>
						</div>
					</>
				)}
			</div>
		</Parent>
	);
};

export default Home;
export interface CardProps {
	setShowKanjiCard: Dispatch<SetStateAction<boolean>>;
	currentWord: KanjiEntry;
}
