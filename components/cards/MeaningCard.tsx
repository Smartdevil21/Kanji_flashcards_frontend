import React, { Dispatch, SetStateAction } from "react";
import { KanjiEntry } from "../../typings/interfaces/kanjis/kanjiList.interface";
import Styles from "../../styles/Home.module.scss";
import { CardProps } from "../../pages";
// import { vibrate } from '../../utils/vibrate.helper';

const MeaningCard = ({ setShowKanjiCard, currentWord }: CardProps) => {
	return (
		<>
			<div
				className={Styles.meaning_card}
				onClick={() => {
					//
					setShowKanjiCard((prev) => !prev);
				}}
			>
				<span className={Styles.word}>{currentWord?.word}</span>
				<h3>{currentWord?.meaning}</h3>
				{currentWord.kun_reading.reading && (
					<p>
						<strong>Kun: </strong>
						{currentWord?.kun_reading?.reading}
					</p>
				)}
				<p>
					<strong>On: </strong>
					{currentWord?.on_reading?.reading}
				</p>
				<br />
				<p>
					<strong>Eg. </strong>
					{currentWord.kun_reading.reading && (
						<>
							{currentWord?.kun_reading?.example?.eg} [{" "}
							{currentWord?.kun_reading?.example?.pronounciation}{" "}
							- {currentWord?.kun_reading?.example?.meaning} ],{" "}
						</>
					)}
					<br />
					{currentWord?.on_reading?.example?.eg} [{" "}
					{currentWord?.on_reading?.example?.pronounciation} -{" "}
					{currentWord?.on_reading?.example?.meaning} ]
				</p>
			</div>
		</>
	);
};

export default MeaningCard;
