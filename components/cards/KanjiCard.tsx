import React, { Dispatch, SetStateAction } from "react";
import { KanjiEntry } from "../../typings/interfaces/kanjis/kanjiList.interface";
import Styles from "../../styles/Home.module.scss";
import { CardProps } from "../../pages";
// import { vibrate } from '../../utils/vibrate.helper';

const KanjiCard = ({ setShowKanjiCard, currentWord }: CardProps) => {
	return (
		<>
			<div
				className={Styles.kanji_card}
				onClick={() => {
					//
					setShowKanjiCard((prev) => !prev);
				}}
			>
				<span className={Styles.word}>{currentWord?.word}</span>
			</div>
		</>
	);
};

export default KanjiCard;
