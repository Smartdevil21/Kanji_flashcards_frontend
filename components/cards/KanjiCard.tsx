import React, { Dispatch, SetStateAction } from 'react'
import { KanjiEntry } from '../../typings/interfaces/kanjis/kanjiList.interface';
import Styles from '../../styles/Home.module.scss';
import { CardProps } from '../../pages';

const KanjiCard = ({ setShowKanjiCard, currentWord }: CardProps) => {
	return (
		<>
			<div
				className={Styles.kanji_card}
				onClick={() => {
					setShowKanjiCard((prev) => !prev);
				}}
			>
				<h1>{currentWord?.word}</h1>
			</div>
		</>
	);
};

export default KanjiCard