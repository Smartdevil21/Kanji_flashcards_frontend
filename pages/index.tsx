import type { NextPage } from 'next';
import Styles from '../styles/Home.module.scss';
import Parent from '../components/parent/Parent';
import { Button, CircularProgress, Stack } from '@mui/material';
import {
	useState,
	Dispatch,
	SetStateAction,
	useEffect,
	useContext,
} from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { getAllKanjisByLevel } from '../typings/services/kanjis/getAllKanjisByLevels.service';
import { KanjiEntry } from '../typings/interfaces/kanjis/getAllKanjisByLevel.interface';
import KanjiCard from '../components/cards/KanjiCard';
import MeaningCard from '../components/cards/MeaningCard';
import { StatesContext } from './_app';
import { getUserLists } from '../typings/services/lists/getUserLists.service';
import { updateList } from '../typings/services/lists/updateList.service';

const Home: NextPage = () => {
	const { states, setStates } = useContext(StatesContext);
	const [showKanjiCard, setShowKanjiCard] = useState(true);
	const [level, setLevel] = useState('5');
	const [selectList, setSelectList] = useState('Bookmarks');
	const [wordList, setWordList] = useState<KanjiEntry[]>([]);
	const [loading, setLoading] = useState(false);
	const [counter, setCounter] = useState({
		pointer: 0,
		history: [0],
	});

	const handleChange = (event: SelectChangeEvent) => {
		setLevel(event.target.value as string);
	};

	//async function for data collection of user from database
	async function getPreLoadDetails() {
		setLoading(true);
		try {
			const response1 = await getAllKanjisByLevel({ level });
			setWordList(response1.data.data);
			if (states.userLoggedIn && states.email_verified) {
				const response2 = await getUserLists({uid: states.uid as string});
				const listNames: string[] = [];
				response2.data.data.map((ele, index) => {
					listNames.push(ele.listName);
				});
				console.log(response2.data.data);
				setStates((prev) => ({ ...prev, listNames }));
			}
		} catch (error) {
			console.log(error);
		}
		setLoading(false);
	}

	async function addToList({ listName }: { listName: string }) {
		try {
			const response = await updateList({
				word: wordList[counter.pointer].word,
				action: 'add',
				uid: states.uid,
				listName,
			});
			console.log(response);
		} catch (error) {
			console.log(error);
		}
	}

	useEffect(() => {
		getPreLoadDetails();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [level]);

	return (
		<Parent>
			<div className={Styles.home_container}>
				{loading ? (
					<CircularProgress style={{ color: 'var(--orange)' }} />
				) : (
					<>
						<Box
							sx={{ minWidth: 120 }}
							style={{ marginBottom: '10px' }}
						>
							<FormControl fullWidth>
								<InputLabel id="demo-simple-select-label">
									Level
								</InputLabel>
								<Select
									labelId="demo-simple-select-label"
									id="demo-simple-select"
									value={level}
									size={'small'}
									label="Age"
									onChange={handleChange}
								>
									<MenuItem value={'5'}>N5</MenuItem>
									<MenuItem value={'4'}>N4</MenuItem>
									<MenuItem value={'3'}>N3</MenuItem>
									<MenuItem value={'2'}>N2</MenuItem>
									<MenuItem value={'1'}>N1</MenuItem>
								</Select>
							</FormControl>
						</Box>
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
							{states.email_verified && states.userLoggedIn && (
								<FormControl fullWidth>
									<InputLabel id="demo-simple-select-label">
										Add to
									</InputLabel>
									<Select
										labelId="demo-simple-select-label"
										id="demo-simple-select"
										value={'Bookmarks'}
										size={'small'}
										label="Add to"
										// onChange={handleChange}
									>
										{states.listNames.map((ele, index) => (
											<MenuItem
												key={index}
												onClick={() => {
													addToList({
														listName: ele,
													});
												}}
												value={ele}
											>
												{ele}
											</MenuItem>
										))}
									</Select>
								</FormControl>
								// <Button>
								// 	<p>Add to List</p>{' '}
								// 	<svg
								// 		clipRule="evenodd"
								// 		fillRule="evenodd"
								// 		strokeLinejoin="round"
								// 		strokeMiterlimit="2"
								// 		viewBox="0 0 24 24"
								// 		xmlns="http://www.w3.org/2000/svg"
								// 	>
								// 		<path d="m16.843 10.211c.108-.141.157-.3.157-.456 0-.389-.306-.755-.749-.755h-8.501c-.445 0-.75.367-.75.755 0 .157.05.316.159.457 1.203 1.554 3.252 4.199 4.258 5.498.142.184.36.29.592.29.23 0 .449-.107.591-.291 1.002-1.299 3.044-3.945 4.243-5.498z" />
								// 	</svg>
								// </Button>
							)}
							{/* <Button
								onClick={() => [
									setCounter((prev) => ({
										...prev,
										pointer: prev.pointer - 1,
									})),
								]}
							>
								Previous
							</Button> */}
							<Button
								onClick={() => {
									// if (
									// 	counter.pointer ===
									// 	counter.history.length - 1
									// ) {
									// 	const index = Math.floor(
									// 		Math.random() * wordList.length
									// 	);
									// 	setCounter((prev) => ({
									// 		...prev,
									// 		history: [...prev.history, index],
									// 		pointer: prev.history.length,
									// 	}));
									// } else {
									// 	setCounter((prev) => ({
									// 		...prev,
									// 		pointer: prev.pointer + 1,
									// 	}));
									// };
									// console.log(counter.pointer ===
									// 	counter.history.length - 1);
									setCounter((prev) => ({
										...prev,
										pointer: Math.floor(
											Math.random() * 100 + 1
										),
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
