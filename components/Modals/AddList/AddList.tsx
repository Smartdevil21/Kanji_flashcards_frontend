import React, { Dispatch, SetStateAction } from 'react';
import Styles from './AddList.module.scss';
import { Button, IconButton, TextField } from '@mui/material';
import { Icon } from '@iconify/react';

interface Props {
	setopenAddListModal: Dispatch<SetStateAction<boolean>>;
	setListName: Dispatch<SetStateAction<string>>;
	listName: string;
}

function AddList({ listName, setListName, setopenAddListModal }: Props) {
	return (
		<div className={Styles.addList}>
			<div className={Styles.closeBtn}>
				<IconButton
					onClick={() => {
						setopenAddListModal(false);
					}}
				>
					<Icon icon="carbon:close" color="red" />
				</IconButton>
			</div>

			<div className={Styles.addListContainer}>
				<h3>Enter the name of the List:</h3>
				<TextField
					variant="outlined"
					value={listName}
					onChange={(e) => {
						setListName(e.target.value);
					}}
					size={'small'}
					autoFocus
				/>
				<div className={Styles.submitBtn}>
					<Button>Add</Button>
				</div>
			</div>
		</div>
	);
}

export default AddList;
