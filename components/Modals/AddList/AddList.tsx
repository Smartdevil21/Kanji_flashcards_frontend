import React, { Dispatch, SetStateAction, useContext, useState } from 'react';
import Styles from './AddList.module.scss';
import { Button, CircularProgress, IconButton, TextField } from '@mui/material';
import { Icon } from '@iconify/react';
import { createList } from '../../../typings/services/lists/createList.service';
import { StatesContext } from '../../../pages/_app';
import { vibrate } from '../../../utils/vibrate.helper';

interface Props {
	setopenAddListModal: Dispatch<SetStateAction<boolean>>;
}

function AddList({ setopenAddListModal }: Props) {
	const { states } = useContext(StatesContext);
	const [loading, setLoading] = useState(false);
	const [listName, setListName] = useState('');

	const createListTrigger = async () => {
		vibrate();
		setLoading(true);
		try {
			const response = await createList({
				ln: listName,
				uid: states.uid as string,
			});
			setopenAddListModal((prev) => !prev);
		} catch (error) {
			console.log(error);
		}
		setLoading(false);
	};

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
					<Button
						onClick={createListTrigger}
						style={{ pointerEvents: loading ? 'none' : 'all' }}
					>
						{loading ? (
							<CircularProgress
								style={{
									color: '#f9f9f9',
									width: '24px',
									height: '24px',
								}}
							/>
						) : (
							'Create'
						)}
					</Button>
				</div>
			</div>
		</div>
	);
}

export default AddList;
