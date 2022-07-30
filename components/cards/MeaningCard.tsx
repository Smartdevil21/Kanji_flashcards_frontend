import React, { Dispatch, SetStateAction } from 'react';
import { KanjiEntry } from '../../typings/interfaces/kanjis/kanjiList.interface';
import Styles from '../../styles/Home.module.scss';
import { CardProps } from '../../pages';

const MeaningCard = ({ setShowKanjiCard, currentWord }: CardProps) => {
	return (
		<>
			<div
				className={Styles.meaning_card}
				onClick={() => {
					setShowKanjiCard((prev) => !prev);
				}}
			>
				<h1>{currentWord?.word}</h1>
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
							{currentWord?.kun_reading?.example?.eg}(
							{currentWord?.kun_reading?.example?.pronounciation}
							),{' '}
						</>
					)}
					{currentWord?.on_reading?.example?.eg}(
					{currentWord?.on_reading?.example?.pronounciation})
				</p>
			</div>
		</>
	);
};

export default MeaningCard;
