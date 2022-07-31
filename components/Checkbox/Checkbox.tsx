import {
	Checkbox,
	FormControl,
	FormControlLabel,
	FormGroup,
} from '@mui/material';
import React, { Dispatch, SetStateAction, useState, useContext } from 'react';
import Styles from './Checkbox.module.scss';
import { IStates } from '../../pages/_app';
import { StatesContext } from '../../pages/_app';
import { vibrate } from '../../utils/vibrate.helper';

function CheckboxElement({
	opt,
	ans,
	selected,
	setState,
	mode,
}: {
	opt: string;
	ans: string;
	selected: any;
	setState: any;
	mode: string;
}) {
	const { states, setStates } = useContext(StatesContext);

	return (
		<div className={Styles.single_select}>
			<FormControl>
				<FormControlLabel
					value="top"
					onClick={vibrate}
					control={
						<Checkbox
							size={states.windowWidth > 750 ? 'small' : 'medium'}
							sx={{ '&.Mui-checked': { color: '#FF7D39' } }}
							checked={selected.indexOf(opt) !== -1}
							onChange={() => {
								if (mode === 'single-select') {
									setState((prev: IStates) => ({
										...prev,
										practiceOpt: [opt],
									}));
								} else {
									if (selected.indexOf(opt) !== -1) {
										setState((prev: IStates) => ({
											...prev,
											practiceOpt:
												prev.practiceOpt.filter(
													(ele) => ele !== opt
												),
										}));
									} else {
										setState((prev: IStates) => ({
											...prev,
											practiceOpt: [
												...prev.practiceOpt,
												opt,
											],
										}));
									}
								}
							}}
						/>
					}
					label={opt}
					labelPlacement="end"
				/>
			</FormControl>
		</div>
	);
}

export default CheckboxElement;
