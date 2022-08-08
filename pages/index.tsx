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
import { KanjiEntry } from '../typings/interfaces/kanjis/kanjiList.interface';
import KanjiCard from '../components/cards/KanjiCard';
import MeaningCard from '../components/cards/MeaningCard';
import { StatesContext } from './_app';
import { getUserLists } from '../typings/services/lists/getUserLists.service';
import { updateList } from '../typings/services/lists/updateList.service';
import { vibrate } from '../utils/vibrate.helper';
import Alert from '@mui/material/Alert';
import Collapse from '@mui/material/Collapse';

const Home: NextPage = () => {
	const { states, setStates } = useContext(StatesContext);
	const [showKanjiCard, setShowKanjiCard] = useState(true);
	const [level, setLevel] = useState('5');
	const [alert, setAlert] = useState(!states.email_verified);
	const [wordList, setWordList] = useState<KanjiEntry[]>([]);
	const [loading, setLoading] = useState(false);
	const [bookmarking, setBookmarking] = useState(false);
	const [counter, setCounter] = useState({
		pointer: 0,
		history: [0],
	});
	const [bySeq, setBySeq] = useState(true);

	const handleChange = (event: SelectChangeEvent) => {
		vibrate();
		setCounter((prev) => ({ ...prev, pointer: 0 }));
		setLevel(event.target.value as string);
	};

	//async function for data collection of user from database
	async function getPreLoadDetails(): Promise<void> {
		setLoading(true);
		try {
			const response1 = await getAllKanjisByLevel({ level });
			setWordList(response1.data.data);
			if (states.userLoggedIn && states.email_verified) {
				const response2 = await getUserLists({
					uid: states.uid as string,
				});
				const listNames: string[] = [];
				response2.data.data.map((ele, index) => {
					listNames.push(ele.listName);
				});
				// console.log(response2.data.data);
				setStates((prev) => ({ ...prev, listNames }));
			}
		} catch (error) {
			console.log(error);
		}
		setLoading(false);
	};

	async function addToList({ listName }: { listName: string }): Promise<void> {
		setBookmarking(true);
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
		setBookmarking(false);
	};

	function swipper(e:HTMLElementEventMap){
		if(!bySeq)return;
		console.log(e);
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
						{states.userLoggedIn && (
							<>
								<Collapse in={alert}>
									<Alert
										severity="success"
										onClose={() => {
											setAlert(false);
										}}
									>
										Verification Email has been sent successfully!
									</Alert>
								</Collapse>
								<br/>
							</>
						)}

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
									{/* <MenuItem value={'3'}>N3</MenuItem>
									<MenuItem value={'2'}>N2</MenuItem>
									<MenuItem value={'1'}>N1</MenuItem> */}
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
								<>
									{bookmarking ? (
										<CircularProgress
											style={{
												color: 'var(--orange)',
												marginRight: '20px',
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
												value={'Bookmarks'}
												size={'small'}
												label="Add to"
												// onChange={handleChange}
											>
												{states.listNames.map(
													(ele, index) => (
														<MenuItem
															key={index}
															onClick={() => {
																vibrate();
																addToList({
																	listName:
																		ele,
																});
															}}
															value={ele}
														>
															<span>{ele}</span>
														</MenuItem>
													)
												)}
											</Select>
										</FormControl>
									)}
								</>
							)}
							<Button
								onClick={() => {
									vibrate();
									if (!showKanjiCard) {
										setShowKanjiCard(true);
									}
									setCounter((prev) => ({
										...prev,
										pointer: Math.floor(
											Math.random() * wordList.length
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
