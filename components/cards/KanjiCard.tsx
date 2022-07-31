import React, { Dispatch, SetStateAction } from 'react'
import { KanjiEntry } from '../../typings/interfaces/kanjis/kanjiList.interface';
import Styles from '../../styles/Home.module.scss';
import { CardProps } from '../../pages';
import { vibrate } from '../../utils/vibrate.helper';

const KanjiCard = ({ setShowKanjiCard, currentWord }: CardProps) => {
	return (
		<>
			<div
				className={Styles.kanji_card}
				onClick={() => {
					vibrate();
					setShowKanjiCard((prev) => !prev);
				}}
			>
				<h1>{currentWord?.word}</h1>
			</div>
		</>
	);
};

export default KanjiCard