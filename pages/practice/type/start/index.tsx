import React, {
	useEffect,
	useState,
	useContext,
	Dispatch,
	SetStateAction,
} from 'react';
import Parent from '../../../../components/parent/Parent';
import { useRouter } from 'next/router';
import Styles from '../../../../styles/practice/start.module.scss';
import {
	FormControl,
	FormControlLabel,
	Checkbox,
	Stack,
	CircularProgress,
	Button,
} from '@mui/material';
import { Icon } from '@iconify/react';
import DangerousIcon from '@mui/icons-material/Dangerous';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { StatesContext } from '../../../_app';
import { getAllKanjisByLevel } from '../../../../typings/services/kanjis/getAllKanjisByLevels.service';
import { getUserLists } from '../../../../typings/services/lists/getUserLists.service';
import { getKanjisByFilter } from '../../../../typings/services/kanjis/getKanjisByFilter.service';
import { KanjiEntry } from '../../../../typings/interfaces/kanjis/kanjiList.interface';
import { getEveryKanji } from '../../../../typings/services/kanjis/getEveryKanji.service';

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
	counter: number;
}

function CreateOptions({
	optArr,
	changeQuestion,
	answer,
	length,
	counter,
}: CreateOptProps) {
	const [selectedAns, setSelectedAns] = useState('');

	function Opt({ opt }: { opt: string }) {
		return (
			<>
				<FormControl className={Styles.option}>
					<FormControlLabel
						onClick={() => {
							setSelectedAns(opt);
							if (answer === opt) {
								setTimeout(() => {
									if (counter < length) {
										setSelectedAns('');
										changeQuestion();
									}else{
										alert("Great Job!")
									}
								}, 1000);
							}
						}}
						control={
							<Checkbox
								sx={{
									'&.Mui-checked': {
										color:
											selectedAns === answer
												? 'green'
												: 'red',
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
	const { query } = useRouter();
	const { states } = useContext(StatesContext);
	const [quesDetails, setQuesDetails] = useState<QuestionDetails>({
		questionsKanjis: [],
		question: {
			_id: '',
			__v: 0,
			meaning: '',
			word: '',
			level: '',
			on_reading: {
				example: {
					eg: '',
					meaning: '',
					pronounciation: '',
				},
				reading: '',
			},
			kun_reading: {
				example: {
					eg: '',
					meaning: '',
					pronounciation: '',
				},
				reading: '',
			},
		},
		answer: '',
		answerArr: [],
	});
	const [loading, setLoading] = useState(false);
	const [coveredQuestions, setCoveredQuestions] = useState<string[]>([]);
	const [start, setStart] = useState(false);
	const [counter, setCounter] = useState(0);
	const [allKanjis, setAllKanjis] = useState<KanjiEntry[]>([]);

	const getAllKanjisOfSelectedLists = async () => {
		setLoading(true);
		try {
			const basicLists = {
				'Kanji[N5]': '5',
				'Kanji[N4]': '4',
				'Kanji[N3]': '3',
				'Kanji[N2]': '2',
				'Kanji[N1]': '1',
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
			Math.random() * quesDetails.questionsKanjis.length
		);
		const que = quesDetails.questionsKanjis[q];
		// console.log(quesDetails.questionsKanjis);
		// console.log(`Index of que choosed: ${q}`);
		if (coveredQuestions.indexOf(que.word) !== -1) {
			getRandomUncoveredQuestion();
			return que;
		} else {
			setCoveredQuestions((prev) => [...prev, que.word]);
			return que;
		}
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
		if (query.m === 'kbm') {
			allKanjis.map((item, index) => {
				if (item === quesDetails.question) return;
				kanjiMeaningsOrWordsArr.push(item.meaning);
			});
		} else {
			allKanjis.map((item, index) => {
				if (item === quesDetails.question) return;
				kanjiMeaningsOrWordsArr.push(item.word);
			});
		}
		function getArrItem() {
			let opt: string = '';
			//change it here!
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
			const kanjiMeaning = getKanjiMeaning();
			const q = Math.floor(
				Math.random() * (kanjiMeaning.split(', ').length - 1)
			);
			opt = kanjiMeaning.split(', ')[q];
			// //console.log(`Sentence ${kanjiMeaning} and choosed ${q} ie ${opt}`);
			if (arr.indexOf(opt) !== -1) {
				getArrItem();
				return opt;
			} else {
				return opt;
			}
		}

		let arr: string[] = [];
		for (let i = 0; i <= 7; i++) {
			const possibleOpt = getArrItem();
			// console.log(`Got ${possibleOpt} in return`);
			// console.log('');
			arr.push(possibleOpt);
		}
		const ans = question?.meaning.split(', ')[
			Math.floor(Math.random() * question?.meaning.split(', ').length)
		] as string;
		arr.splice(Math.floor(Math.random() * 7), 0, ans);
		setCounter((prev) => (prev += 1));
		setQuesDetails((prev) => ({
			...prev,
			question,
			answer: ans,
			answerArr: Array.from(new Set(arr)),
		}));
		// console.log({
		// 	question,
		// 	ansArr: arr,
		// });
	};

	useEffect(() => {
		getAllKanjisOfSelectedLists();
	}, []);

	return (
		<Parent>
			<div className={Styles.game}>
				<h2>
					{query.m === 'kbfr'
						? 'Guess the Kanji based on Furigana Reading.'
						: 'Guess the Furigana reading based on Kanji.'}
				</h2>
				{/* <Button onClick={changeQuestion}>change</Button> */}
				<div className={Styles.score}>
					<h4>Your Score</h4>
					<Stack
						direction={'row'}
						spacing={3}
						alignItems={'center'}
						justifyContent={'center'}
					>
						<p>
							<span>
								<Icon
									style={{
										transform: 'translateY(2.5px)',
										color: 'green',
									}}
									icon="charm:tick"
								/>
								: 00
							</span>
						</p>
						<p>
							<span>
								<Icon
									style={{
										transform: 'translateY(2.5px)',
										color: 'red',
									}}
									icon="akar-icons:cross"
								/>
								: 00
							</span>
						</p>
					</Stack>
					<p className={Styles.counter}>
						{counter}/{query.l}
					</p>
				</div>
				{!loading ? (
					start ? (
						<div className={Styles.question}>
							<h1>{quesDetails.question?.word}</h1>
							<div className={Styles.options}>
								<CreateOptions
									answer={quesDetails.answer}
									changeQuestion={changeQuestion}
									optArr={quesDetails.answerArr}
									length={Number(query.l)}
									counter={counter}
								/>
							</div>
						</div>
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
						>
							Start
						</Button>
					)
				) : (
					<CircularProgress
						style={{
							color: 'var(--orange)',
							marginTop: '25px',
						}}
					/>
				)}
			</div>
		</Parent>
	);
}

export default Game;
