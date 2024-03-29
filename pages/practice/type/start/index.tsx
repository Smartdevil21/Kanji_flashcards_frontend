import React, {
	useEffect,
	useState,
	useContext,
	Dispatch,
	SetStateAction,
} from "react";
import Parent from "../../../../components/parent/Parent";
import { useRouter } from "next/router";
import Styles from "../../../../styles/practice/start.module.scss";
import {
	FormControl,
	FormControlLabel,
	Checkbox,
	Stack,
	CircularProgress,
	Button,
	InputLabel,
	Select,
	MenuItem,
} from "@mui/material";
import { Icon } from "@iconify/react";
import DangerousIcon from "@mui/icons-material/Dangerous";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { StatesContext } from "../../../_app";
import { getAllKanjisByLevel } from "../../../../typings/services/kanjis/getAllKanjisByLevels.service";
import { getUserLists } from "../../../../typings/services/lists/getUserLists.service";
import { getKanjisByFilter } from "../../../../typings/services/kanjis/getKanjisByFilter.service";
import { KanjiEntry } from "../../../../typings/interfaces/kanjis/kanjiList.interface";
import { getEveryKanji } from "../../../../typings/services/kanjis/getEveryKanji.service";
import { updateList } from "../../../../typings/services/lists/updateList.service";
import { vibrate } from "../../../../utils/vibrate.helper";
import { ListData } from "../../../../typings/interfaces/lists/getUserLists.interface";

interface QuestionDetails {
	questionsKanjis: KanjiEntry[];
	question: KanjiEntry;
	answer: string;
	answerArr: string[];
}
interface CreateOptProps {
	optArr: string[];
	changeQuestion: () => void;
	answer: string;
	length: number;
	counter: {
		count: number;
		correct: number;
		wrong: number;
	};
	setCounter: React.Dispatch<
		React.SetStateAction<{
			count: number;
			correct: number;
			wrong: number;
		}>
	>;
}

function CreateOptions({
	optArr,
	changeQuestion,
	answer,
	length,
	counter,
	setCounter,
}: CreateOptProps) {
	const [selectedAns, setSelectedAns] = useState("");
	const Router = useRouter();

	function Opt({ opt }: { opt: string }) {
		return (
			<>
				<FormControl className={Styles.option}>
					<FormControlLabel
						onClick={() => {
							setSelectedAns(opt);
							if (answer === opt) {
								setTimeout(() => {
									if (counter.count < length) {
										setCounter((prev) => ({
											...prev,
											count: prev.count + 1,
											correct: prev.correct + 1,
										}));
										setSelectedAns("");
										changeQuestion();
									} else {
										alert(
											`Practice completed! \nYour accuracy was: ${Math.round(
												(counter.correct /
													(counter.correct +
														counter.wrong)) *
													100
											)}%`
										);
										Router.push("/practice");
									}
								}, 1000);
							} else {
								setCounter((prev) => ({
									...prev,
									wrong: prev.wrong + 1,
								}));
							}
						}}
						control={
							<Checkbox
								sx={{
									"&.Mui-checked": {
										color:
											selectedAns === answer
												? "green"
												: "red",
									},
								}}
								checked={selectedAns === opt}
								checkedIcon={
									selectedAns === answer ? (
										<CheckBoxIcon />
									) : (
										<DangerousIcon />
									)
								}
							/>
						}
						label={opt}
						labelPlacement="end"
					/>
				</FormControl>
			</>
		);
	}

	return (
		<>
			{optArr.map((opt, index) => {
				return <Opt key={index} opt={opt} />;
			})}
		</>
	);
}

function Game() {
	const router = useRouter();
	const { states, setStates } = useContext(StatesContext);
	const { practiceOpt, lists } = states;
	const [quesDetails, setQuesDetails] = useState<QuestionDetails>({
		questionsKanjis: [],
		question: {
			_id: "",
			__v: 0,
			meaning: "",
			word: "",
			level: "",
			on_reading: {
				example: {
					eg: "",
					meaning: "",
					pronounciation: "",
				},
				reading: "",
			},
			kun_reading: {
				example: {
					eg: "",
					meaning: "",
					pronounciation: "",
				},
				reading: "",
			},
		},
		answer: "",
		answerArr: [],
	});
	const [loading, setLoading] = useState(true);
	const [bookmarking, setBookmarking] = useState(false);
	const [coveredQuestions, setCoveredQuestions] = useState<string[]>([]);
	const [gameLength, setGameLength] = useState(0);
	const [start, setStart] = useState(false);
	const [counter, setCounter] = useState({
		count: 0,
		correct: 0,
		wrong: 0,
	});
	const [allKanjis, setAllKanjis] = useState<KanjiEntry[]>([]);

	async function addToList({
		listName,
	}: {
		listName: string;
	}): Promise<void> {
		setBookmarking(true);
		try {
			const response = await updateList({
				word: quesDetails.question.word,
				action: "add",
				uid: states.uid,
				listName,
			});
			const activeList = states.lists.filter(
				(ele) => ele.listName === listName
			)[0];
			activeList.listItems.push(quesDetails.question.word);
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

	useEffect(() => {
		if (router.query.l === "all") {
			// lists.map((list) => {
			// 	if (practiceOpt.includes(list.listName)) {
			// 		setGameLength((prev) => (prev += list.listItems.length));
			// 	}
			// });

			practiceOpt.map((opt) => {
				lists.map((list) => {
					if (list.listName === opt) {
						setGameLength(
							(prev) => (prev += list.listItems.length)
						);
					}
				});
				switch (opt) {
					case "Kanji[N5]":
						setGameLength((prev) => (prev += 100));
						break;
					case "Kanji[N4]":
						setGameLength((prev) => (prev += 144));
						break;
					case "Kanji[N3]":
						setGameLength((prev) => (prev += 300));
						break;
					default:
						break;
				}
			});
		} else {
			setGameLength(Number(router.query.l));
		}
	}, [router.query.l]);
	console.log({ gameLength, practiceOpt, lists });

	const getAllKanjisOfSelectedLists = async () => {
		if (!states.username) return router.push("/");
		setLoading(true);
		try {
			const basicLists = {
				"Kanji[N5]": "5",
				"Kanji[N4]": "4",
				"Kanji[N3]": "3",
				"Kanji[N2]": "2",
				"Kanji[N1]": "1",
			};
			const userListsResponse = await getUserLists({
				uid: states.uid as string,
				lns: states.practiceOpt.filter((ele) => !(ele in basicLists)),
			});
			let selectedKanjiWords: string[] = [];
			userListsResponse.data.data.map((list, index) => {
				selectedKanjiWords = [...selectedKanjiWords, ...list.listItems];
			});
			const selectedLevels: string[] = [];
			Object.entries(basicLists)
				.filter((entry) => states.practiceOpt.indexOf(entry[0]) !== -1)
				.map((level) => {
					selectedLevels.push(level[1]);
				});
			const reqKanjiEntries = await getKanjisByFilter({
				items: Array.from(new Set(selectedKanjiWords)),
				level: selectedLevels,
			});
			setQuesDetails((prev) => ({
				...prev,
				questionsKanjis: reqKanjiEntries.data.data,
			}));
			const allKanjisResponse = await getEveryKanji();
			setAllKanjis(allKanjisResponse.data.data);
		} catch (error) {
			console.log(error);
		}
		setLoading(false);
	};

	const getRandomUncoveredQuestion = () => {
		const q = Math.floor(
			Math.random() * (quesDetails.questionsKanjis.length - 1)
		);
		let que = quesDetails.questionsKanjis[q];
		while (coveredQuestions.includes(que.word)) {
			const q = Math.floor(
				Math.random() * quesDetails.questionsKanjis.length
			);
			que = quesDetails.questionsKanjis[q];
		}
		setCoveredQuestions((prev) => [...prev, que.word]);
		return que;
	};

	const changeQuestion = () => {
		const kanjiMeaningsOrWordsArr: string[] = [];
		let question: KanjiEntry;
		if (coveredQuestions.length < quesDetails.questionsKanjis.length) {
			question = getRandomUncoveredQuestion() as KanjiEntry;
		} else {
			question =
				quesDetails.questionsKanjis[
					Math.floor(
						Math.random() * quesDetails.questionsKanjis.length
					)
				];
		}
		if (router.query.m === "kbm") {
			allKanjis.map((item, index) => {
				if (item?.word === quesDetails?.question?.word) return;
				kanjiMeaningsOrWordsArr.push(item.meaning);
			});
		} else {
			allKanjis.map((item, index) => {
				if (item?.word === quesDetails?.question?.word) return;
				kanjiMeaningsOrWordsArr.push(item.word);
			});
		}
		function getArrItem() {
			let opt: string = "";
			function getKanjiMeaning() {
				let result =
					kanjiMeaningsOrWordsArr[
						Math.floor(
							Math.random() * kanjiMeaningsOrWordsArr.length
						)
					];
				if (result === quesDetails.question.meaning) {
					getKanjiMeaning();
					return result;
				} else {
					return result;
				}
			}
			if (router.query.m === "kbm") {
				const kanjiMeaning = getKanjiMeaning();
				const q = Math.floor(
					Math.random() * (kanjiMeaning.split(", ").length - 1)
				);
				opt = kanjiMeaning.split(", ")[q];
			} else {
				opt =
					kanjiMeaningsOrWordsArr[
						Math.floor(
							Math.random() * kanjiMeaningsOrWordsArr.length
						)
					];
			}
			if (arr.includes(opt)) {
				getArrItem();
			}
			return opt;
		}

		let arr: string[] = [];
		for (let i = 0; i <= 7; i++) {
			const possibleOpt = getArrItem();
			arr.push(possibleOpt);
		}
		let ans: string = "";
		if (router.query.m === "kbm") {
			ans = question?.meaning.split(", ")[
				Math.floor(Math.random() * question?.meaning.split(", ").length)
			] as string;
		} else {
			ans = question.word;
		}
		arr.splice(Math.floor(Math.random() * 7), 0, ans);
		// setCounter((prev) => (prev += 1));
		setQuesDetails((prev) => ({
			...prev,
			question,
			answer: ans,
			answerArr: Array.from(new Set(arr)),
		}));
	};

	useEffect(() => {
		getAllKanjisOfSelectedLists();
	}, []);

	return (
		<Parent>
			<div className={Styles.game}>
				<h2>
					{router.query.m === "kbm"
						? "Guess the Kanji by its meaning."
						: "Guess the meaning of the Kanji."}
				</h2>
				{/* <Button onClick={changeQuestion}>change</Button> */}
				<div className={Styles.score}>
					<h4>Your Score</h4>
					<Stack
						direction={"row"}
						spacing={3}
						alignItems={"center"}
						justifyContent={"center"}
					>
						<p>
							<span>
								<Icon
									style={{
										transform: "translateY(2.5px)",
										color: "green",
									}}
									icon="charm:tick"
								/>
								: {counter.correct}
							</span>
						</p>
						<p>
							<span>
								<Icon
									style={{
										transform: "translateY(2.5px)",
										color: "red",
									}}
									icon="akar-icons:cross"
								/>
								: {counter.wrong}
							</span>
						</p>
					</Stack>
					<p className={Styles.counter}>
						{counter.count}/{gameLength}
					</p>
				</div>

				{!loading ? (
					start ? (
						<>
							<Stack sx={{ mt: 2 }}>
								{states.email_verified &&
									states.userLoggedIn && (
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
														<MenuItem
															value={
																"Choose List"
															}
														>
															<span>
																Choose List
															</span>
														</MenuItem>
														{/* {states.lists.map(
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
												)} */}
														{states.lists.map(
															(ele, index) => {
																const ifWordExistsInList =
																	ele.listItems?.includes(
																		quesDetails
																			.question
																			.word
																	);
																return (
																	<MenuItem
																		key={
																			index
																		}
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
																						"&:hover":
																							{
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
																				addToList(
																					{
																						listName:
																							ele.listName,
																					}
																				);
																			}
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
														)}
													</Select>
												</FormControl>
											)}
										</>
									)}
							</Stack>
							<div className={Styles.question}>
								<h1>
									{router.query.m === "kbm"
										? quesDetails.question?.word
										: quesDetails.question.meaning}
								</h1>
								<div className={Styles.options}>
									<CreateOptions
										answer={quesDetails.answer}
										changeQuestion={changeQuestion}
										optArr={quesDetails.answerArr}
										length={Number(gameLength)}
										counter={counter}
										setCounter={setCounter}
									/>
								</div>
							</div>
						</>
					) : (
						<Button
							onClick={() => {
								setLoading(true);
								changeQuestion();
								setTimeout(() => {
									setLoading(false);
									setStart(true);
								}, 1500);
							}}
							style={{ height: "fit-content" }}
						>
							Start
						</Button>
					)
				) : (
					<CircularProgress
						style={{
							color: "var(--orange)",
							marginTop: "25px",
						}}
					/>
				)}
			</div>
		</Parent>
	);
}

export default Game;
