import React from 'react';
import Parent from '../../../../components/parent/Parent';
import { useRouter } from 'next/router';
import Styles from '../../../../styles/practice/start.module.scss';
import { FormControl, FormControlLabel, Checkbox, Stack } from '@mui/material';
import { Icon } from '@iconify/react';
import DangerousIcon from '@mui/icons-material/Dangerous';

interface OptProps {
	label: number;
}

function Option({ label }: OptProps) {
	return (
		<div className={Styles.option}>
			<FormControl>
				<FormControlLabel
					value="top"
					control={
						<Checkbox
							sx={{ '&.Mui-checked': { color: 'green' } }}
              // checkedIcon={<DangerousIcon/>}
						/>
					}
					label={label}
					labelPlacement="end"
				/>
			</FormControl>
		</div>
	);
}

function Game() {
	const { query } = useRouter();
	return (
		<Parent>
			<div className={Styles.game}>
				<h2>
					{query.m === 'kbfr'
						? 'Guess the Kanji based on Furigana Reading.'
						: 'Guess the Furigana reading based on Kanji.'}
				</h2>
				<div className={Styles.score}>
					<h4>Your Score</h4>
					<Stack
						direction={'row'}
						spacing={3}
						alignItems={'center'}
						justifyContent={'center'}
					>
						<p>
							<span>
								<Icon
									style={{ transform: 'translateY(2.5px)', color:'green' }}
									icon="charm:tick"
								/>
								: 00
							</span>
						</p>
						<p>
							<span>
								<Icon
									style={{ transform: 'translateY(2.5px)', color:'red' }}
									icon="akar-icons:cross"
								/>
								: 00
							</span>
						</p>
					</Stack>
					<p className={Styles.counter}>00/{query.l}</p>
				</div>
				<div className={Styles.question}>
					<h1>Kanji Word</h1>
					<div className={Styles.options}>
						<Stack marginBottom={2} spacing={3} direction={'row'}>
							{[1, 2, 3].map((ele, index) => (
								<Option label={ele} key={index} />
							))}
						</Stack>
						<Stack marginBottom={2} spacing={3} direction={'row'}>
							{[1, 2, 3].map((ele, index) => (
								<Option label={ele} key={index} />
							))}
						</Stack>
						<Stack spacing={3} direction={'row'}>
							{[1, 2, 3].map((ele, index) => (
								<Option label={ele} key={index} />
							))}
						</Stack>
					</div>
				</div>
			</div>
		</Parent>
	);
}

export default Game;
