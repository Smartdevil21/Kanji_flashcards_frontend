import { FormControlLabel, FormControl, Checkbox, Button } from '@mui/material';
import Link from 'next/link';
import React, { useState, useContext, Dispatch, SetStateAction } from 'react';
import CheckboxElement from '../../../components/Checkbox/Checkbox';
import Parent from '../../../components/parent/Parent';
import Styles from '../../../styles/practice/Type.module.scss';
import { StatesContext } from '../../_app';

function CheckboxComp({
	selected,
	opt,
	setSelected,
	label,
}: {
	selected: string;
	opt: string;
	setSelected: Dispatch<SetStateAction<string>>;
	label: string;
}) {
	return (
		<div className={Styles.checkbox}>
			<FormControl>
				<FormControlLabel
					value="top"
					control={
						<Checkbox
							sx={{ '&.Mui-checked': { color: '#FF7D39' } }}
							checked={opt === selected}
							onChange={() => {
								setSelected(opt);
							}}
						/>
					}
					label={label}
					labelPlacement="end"
				/>
			</FormControl>
		</div>
	);
}

function TypeOfPractice() {
	// const {states, setStates} = useContext(StatesContext);
	const [selected, setSelected] = useState('kbfr');
	const [length, setLength] = useState('25');
	return (
		<Parent>
			<div className={Styles.mode_selection}>
				<h1>Choose the mode for your practice:</h1>
				<div className={Styles.classes}>
					<h3>Type-1:</h3>
					<div className={Styles.classes_container}>
						<CheckboxComp
							selected={selected}
							setSelected={setSelected}
							label={'Guess The Kanji based on Furigana reading.'}
							opt={'kbfr'}
						/>
					</div>
				</div>
				<div className={Styles.classes}>
					<h3>Type-2:</h3>
					<div className={Styles.classes_container}>
						<CheckboxComp
							selected={selected}
							setSelected={setSelected}
							label={'Guess The Furigana reading based on Kanji.'}
							opt={'frbk'}
						/>
					</div>
				</div>
				<br />
				<div className={Styles.classes}>
					<h3>Select length:</h3>
					<div className={Styles.classes_container}>
						<CheckboxComp
							selected={length}
							setSelected={setLength}
							opt={'25'}
							label={'25'}
						/>
						<CheckboxComp
							selected={length}
							setSelected={setLength}
							opt={'50'}
							label={'50'}
						/>
						<CheckboxComp
							selected={length}
							setSelected={setLength}
							opt={'75'}
							label={'75'}
						/>
						<CheckboxComp
							selected={length}
							setSelected={setLength}
							opt={'100'}
							label={'100'}
						/>
					</div>
				</div>
				<div className={Styles.nxt}>
					<Link
						href={`/practice/type/start?m=${selected}&l=${length}`}
						passHref={true}
					>
						<Button>Start</Button>
					</Link>
				</div>
			</div>
		</Parent>
	);
}

export default TypeOfPractice;
