import React, { useEffect, useState, useContext } from 'react';
import Parent from '../../components/parent/Parent';
import Styles from '../../styles/practice/practice.module.scss';
import CheckboxElement from '../../components/Checkbox/Checkbox';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { StatesContext } from '../_app';
import { Button } from '@mui/material';
import Link from 'next/link';

function Practice() {
	const { states, setStates } = useContext(StatesContext);
	const [mode, setMode] = useState('multi-select');

	const handleChange = (
		event: React.MouseEvent<HTMLElement>,
		newMode: string
	) => {
		setMode(newMode);
	};

	return (
		<Parent>
			<div className={Styles.practice}>
				<h1>Choose the classes you want to practice:</h1>
				<ToggleButtonGroup
					color="primary"
					value={mode}
					exclusive
					onChange={handleChange}
					size={'small'}
				>
					<ToggleButton
						value="single-select"
						disabled={states.practiceOpt.length > 1}
					>
						Single-Select
					</ToggleButton>
					<ToggleButton value="multi-select">
						Multi-Select
					</ToggleButton>
				</ToggleButtonGroup>
				<div className={Styles.classes}>
					<h3>Basic:</h3>
					<div className={Styles.classes_container}>
						<CheckboxElement
							opt={'Hiragana'}
							ans={''}
							selected={states?.practiceOpt}
							setState={setStates}
							mode={mode}
						/>
						<CheckboxElement
							opt={'Katakana'}
							ans={''}
							selected={states?.practiceOpt}
							setState={setStates}
							mode={mode}
						/>
						<CheckboxElement
							opt={'Kanji'}
							ans={''}
							selected={states?.practiceOpt}
							setState={setStates}
							mode={mode}
						/>
					</div>
				</div>
				<div className={Styles.classes}>
					<h3>Your Lists</h3>
					<div className={Styles.classes_container}>
						<CheckboxElement
							opt={'Pratik'}
							ans={''}
							selected={states?.practiceOpt}
							setState={setStates}
							mode={mode}
						/>
						<CheckboxElement
							opt={'Rohit'}
							ans={''}
							selected={states?.practiceOpt}
							setState={setStates}
							mode={mode}
						/>
					</div>
				</div>
				<div className={Styles.nxt}>
					<Button disabled={states.practiceOpt.length===0}><Link href={'/practice/type'} passHref>Next</Link></Button>
				</div>
			</div>
		</Parent>
	);
}

export default Practice;
