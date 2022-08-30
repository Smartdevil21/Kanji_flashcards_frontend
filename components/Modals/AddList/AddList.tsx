import React, { Dispatch, SetStateAction, useContext, useState } from 'react';
import Styles from './AddList.module.scss';
import { Button, CircularProgress, IconButton, TextField } from '@mui/material';
import { Icon } from '@iconify/react';
import { createList } from '../../../typings/services/lists/createList.service';
import { StatesContext } from '../../../pages/_app';
import { vibrate } from '../../../utils/vibrate.helper';

interface Props {
	setopenAddListModal: Dispatch<SetStateAction<boolean>>;
	setListUpdated: Dispatch<SetStateAction<boolean>>;
}

function AddList({ setopenAddListModal, setListUpdated }: Props) {
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
			setListUpdated(true);
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
				<form onSubmit={createListTrigger}>
				<h3>Enter the name of the List:</h3>
				<TextField
					variant="outlined"
					value={listName}
					onChange={(e) => {
						if (e.target.value.length > 15)
							return alert('Name exceeding 15 charecters!');
						setListName(e.target.value);
					}}
					size={'small'}
					autoFocus
				/>
				<div className={Styles.submitBtn}>
					<Button
						type='submit'
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
				</form>
			</div>
		</div>
	);
}

export default AddList;
