import type { NextPage } from 'next';
import Styles from '../styles/Home.module.scss';
import Parent from '../components/parent/Parent';
import { Button, Stack } from '@mui/material';
import { useState, Dispatch, SetStateAction } from 'react';

type CardProps = {
	setShowKanjiCard: Dispatch<SetStateAction<boolean>>;
};

const KanjiCard = ({ setShowKanjiCard }: CardProps) => {
	return (
		<>
			<div
				className={Styles.kanji_card}
				onClick={() => {
					setShowKanjiCard((prev) => !prev);
				}}
			>
				<h1>漢字</h1>
			</div>
		</>
	);
};

const MeaningCard = ({ setShowKanjiCard }: CardProps) => {
	return (
		<>
			<div
				className={Styles.meaning_card}
				onClick={() => {
					setShowKanjiCard((prev) => !prev);
				}}
			>
				<h1>漢字</h1>
				<h3>{'(Kanji)'}</h3>
				<p>
					<strong>Kun: </strong>Kanji
				</p>
				<p>
					<strong>On: </strong>Kanji
				</p>
				<br />
				<p>
					<strong>Ex.: </strong>漢字(Kanji), 漢字(Kanji)
				</p>
			</div>
		</>
	);
};

const Home: NextPage = () => {
	const [showKanjiCard, setShowKanjiCard] = useState(true);

	return (
		<Parent>
			<div className={Styles.home_container}>
				<Stack direction={'row'} alignItems={"center"} marginBottom={"10px"} spacing={1}>
					<label htmlFor="level">Select Level: </label>
					<select name="level" aria-label="Select Level:" id="">
						<option value="5">N5</option>
						<option value="4">N4</option>
						<option value="3">N3</option>
						<option value="2">N2</option>
						<option value="1">N1</option>
					</select>
				</Stack>
				{showKanjiCard ? (
					<KanjiCard setShowKanjiCard={setShowKanjiCard} />
				) : (
					<MeaningCard setShowKanjiCard={setShowKanjiCard} />
				)}
				<div className={Styles.card_btns}>
					<Button>
						<p>Add to List</p>{' '}
						<svg
							clipRule="evenodd"
							fillRule="evenodd"
							strokeLinejoin="round"
							strokeMiterlimit="2"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path d="m16.843 10.211c.108-.141.157-.3.157-.456 0-.389-.306-.755-.749-.755h-8.501c-.445 0-.75.367-.75.755 0 .157.05.316.159.457 1.203 1.554 3.252 4.199 4.258 5.498.142.184.36.29.592.29.23 0 .449-.107.591-.291 1.002-1.299 3.044-3.945 4.243-5.498z" />
						</svg>
					</Button>
					<Button>Previous</Button>
					<Button>Next</Button>
				</div>
			</div>
		</Parent>
	);
};

export default Home;
