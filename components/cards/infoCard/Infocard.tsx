import React from 'react';
import Styles from './Infocard.module.scss';
import { KanjiEntry } from '../../../typings/interfaces/kanjis/kanjiList.interface';

interface Props {
	kanjiWord: KanjiEntry;
}

function Infocard({ kanjiWord }: Props) {
	return (
		<>
			<div
				className={Styles.info_card}
				onClick={() => {

				}}
			>
				<h1>{kanjiWord?.word}</h1>
				<h3>{kanjiWord?.meaning}</h3>
				{kanjiWord.kun_reading.reading && (
					<p>
						<strong>Kun: </strong>
						{kanjiWord?.kun_reading?.reading}
					</p>
				)}
				<p>
					<strong>On: </strong>
					{kanjiWord?.on_reading?.reading}
				</p>
				<br />
				<p>
					<strong>Eg. </strong>
					{kanjiWord.kun_reading.reading && (
						<>
							{kanjiWord?.kun_reading?.example?.eg}(
							{kanjiWord?.kun_reading?.example?.pronounciation}
							),{' '}
						</>
					)}
					{kanjiWord?.on_reading?.example?.eg}(
					{kanjiWord?.on_reading?.example?.pronounciation})
				</p>
			</div>
		</>
	);
}

export default Infocard;
