import { FormControlLabel, FormControl, Checkbox, Button } from '@mui/material';
import Link from 'next/link';
import React, { useState, useContext, Dispatch, SetStateAction, useEffect } from 'react';
import CheckboxElement from '../../../components/Checkbox/Checkbox';
import Parent from '../../../components/parent/Parent';
import Styles from '../../../styles/practice/Type.module.scss';
import { StatesContext } from '../../_app';
import { useRouter } from 'next/router';
import { vibrate } from '../../../utils/vibrate.helper';

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
					onClick={vibrate}
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
	const {states} = useContext(StatesContext);
	const [selected, setSelected] = useState('kbm');
	const [length, setLength] = useState('25');
	const router = useRouter();

	useEffect(()=>{
		if(!states.username){
			router.push('/');
		}
	}, [])

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
							label={'Guess the Kanji by its meaning.'}
							opt={'kbm'}
						/>
					</div>
				</div>
				<div className={Styles.classes}>
					<h3>Type-2:</h3>
					<div className={Styles.classes_container}>
						<CheckboxComp
							selected={selected}
							setSelected={setSelected}
							label={'Guess the meaning of Kanji.'}
							opt={'mok'}
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
						<Button onClick={vibrate}>Start</Button>
					</Link>
				</div>
			</div>
		</Parent>
	);
}

export default TypeOfPractice;
