import {
	Checkbox,
	FormControl,
	FormControlLabel,
	FormGroup,
} from '@mui/material';
import React, { Dispatch, SetStateAction, useState } from 'react';
import Styles from './Checkbox.module.scss';
import {IStates} from '../../pages/_app';

// function SelectOpt({ opt, ans }: { opt: string; ans: string }) {
// 	const [checked, setChecked] = useState(false);

// 	return (
// 		<div className={Styles.checkbox}>
// 			<FormControl>
// 				<FormControlLabel
// 					value="top"
// 					control={
// 						<Checkbox
// 							onChange={() => {
// 								setChecked((prev) => !prev);
// 							}}
// 						/>
// 					}
// 					label={opt}
// 					labelPlacement="end"
// 				/>
// 			</FormControl>
// 		</div>
// 	);
// }

function CheckboxElement({
	opt,
	ans,
	selected,
	setState,
	mode
}: {
	opt: string;
	ans: string;
	selected: any ; 
	setState: any;
	mode:string
}) {
	const [checked, setChecked] = useState(false);
	return (
		<div className={Styles.single_select}>
			<FormControl>
				<FormControlLabel
					value="top"
					control={
						<Checkbox
						sx={{'&.Mui-checked':{color:"#FF7D39"}}}
						checked={selected.indexOf(opt)!==-1}
							onChange={() => {
								setChecked((prev) => !prev);
								if(mode==="single-select"){
									setState((prev: IStates)=>({...prev, practiceOpt:[opt]}))
								}else{
									if(selected.indexOf(opt)!==-1){
										setState((prev:IStates)=>({...prev, practiceOpt:prev.practiceOpt.filter(ele=>ele!==opt)}))
									}else{
										setState((prev:IStates)=>({...prev, practiceOpt:[...prev.practiceOpt, opt]}))
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
