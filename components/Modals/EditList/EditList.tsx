import { CircularProgress, IconButton, Stack } from '@mui/material';
import React, { Dispatch, SetStateAction, useContext, useState } from 'react';
import Styles from './EditList.module.scss';
import { Icon } from '@iconify/react';
import { ListData } from '../../../typings/interfaces/lists/getUserLists.interface';
import { updateList } from '../../../typings/services/lists/updateList.service';
import { StatesContext } from '../../../pages/_app';
import { vibrate } from '../../../utils/vibrate.helper';

interface Props {
	setOpenEditModal: Dispatch<SetStateAction<boolean>>;
	listToBeEdited?: ListData;
}

function ListItem({
	item,
	ln
}: {
	item: string;
	ln: string;
}) {
	const { states, setStates } = useContext(StatesContext);
	const [deleted, setDeleted] = useState(false);
	const [loading, setLoading] = useState(false);
	async function deleteListItem({ ln, uid }: { ln: string; uid: string }) {
		setLoading(true);
		try {
			const response = await updateList({
				listName: ln,
				uid,
				action: 'deleteItem',
				word: item,
			});
			if (response.data.success) {
				setDeleted(true);
			}
		} catch (error) {
			console.log(error);
		}
		setLoading(false);
	}

	return (
		<div
			className={Styles.list_item}
			style={{
				opacity: deleted ? '0.2' : '1',
				pointerEvents: deleted ? 'none' : 'all',
			}}
		>
			<p style={{textDecoration:deleted?'line-through':'none'}}>{item}</p>
			{loading ? (
				<CircularProgress
					style={{
						color: 'var(--orange)',
						width: '24px',
						height: '24px',
					}}
				/>
			) : (
				<IconButton
					onClick={() => {
						vibrate();
						deleteListItem({ ln, uid: states.uid as string });
					}}
				>
					<Icon icon="carbon:close" color="red" />
				</IconButton>
			)}
		</div>
	);
}

function EditList({
	setOpenEditModal,
	listToBeEdited,
}: Props) {
	return (
		<div className={Styles.wrapper}>
			<div className={Styles.edit_list_modal}>
				<Stack direction={'row'} justifyContent={'space-between'}>
					<h1>{listToBeEdited?.listName}</h1>
					<IconButton
						onClick={() => {
							// vibrate();
							setOpenEditModal((prev) => !prev);
						}}
					>
						<Icon icon="carbon:close" color="red" />
					</IconButton>
				</Stack>
				<Stack direction={'column'} spacing={1} marginTop={'20px'}>
					{listToBeEdited?.listItems.map((listItem, index) => (
						<ListItem
							key={index}
							item={listItem}
							ln={listToBeEdited.listName}
						/>
					))}
				</Stack>
			</div>
		</div>
	);
}

export default EditList;
