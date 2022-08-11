import { CircularProgress, IconButton, Stack } from '@mui/material';
import React, { Dispatch, SetStateAction, useContext, useState } from 'react';
import Styles from './EditList.module.scss';
import { Icon } from '@iconify/react';
import { ListData } from '../../../typings/interfaces/lists/getUserLists.interface';
import { updateList } from '../../../typings/services/lists/updateList.service';
import { StatesContext } from '../../../pages/_app';
import { vibrate } from '../../../utils/vibrate.helper';
import { KanjiEntry } from '../../../typings/interfaces/kanjis/kanjiList.interface';
import { searchKanjiByWord } from '../../../typings/services/kanjis/searchKanjiByWord.service';
import Infocard from '../../cards/infoCard/Infocard';

interface ListItemProps {
	item: string;
	ln: string;
	setShowMeaning: Dispatch<SetStateAction<boolean>>;
	setListUpdated: Dispatch<SetStateAction<boolean>>;
	setCurrentKanjiSelected: Dispatch<SetStateAction<KanjiEntry>>;
}

function ListItem({
	item,
	ln,
	setShowMeaning,
	setListUpdated,
	setCurrentKanjiSelected,
}: ListItemProps) {
	const { states } = useContext(StatesContext);
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
				setListUpdated(true);
				setDeleted(true);
			}
		} catch (error) {
			console.log(error);
		}
		setLoading(false);
	}

	const getSelectedKanjiDetails = async (kanji: string) => {
		setLoading(true);
		try {
			const result = await searchKanjiByWord({ keyword: kanji });
			setCurrentKanjiSelected(result.data.data[0]);
			setShowMeaning(true);
		} catch (error) {
			console.log(error);
		}
		setLoading(false);
	};

	return (
		<div
			className={Styles.list_item}
			style={{
				opacity: deleted ? '0.2' : '1',
				pointerEvents: deleted ? 'none' : 'all',
			}}
		>
			<p style={{ textDecoration: deleted ? 'line-through' : 'none' }}>
				{item}
			</p>
			{loading ? (
				<CircularProgress
					style={{
						color: 'var(--orange)',
						width: '40px',
						height: '40px',
						padding: '8px',
					}}
				/>
			) : (
				<Stack direction={'row'}>
					<IconButton
						color="info"
						onClick={() => {
							getSelectedKanjiDetails(item);
						}}
					>
						<Icon icon="codicon:info" color="#26b5f6" />
					</IconButton>
					<IconButton
						onClick={() => {
							vibrate();
							deleteListItem({ ln, uid: states.uid as string });
						}}
					>
						<Icon icon="carbon:close" color="red" />
					</IconButton>
				</Stack>
			)}
		</div>
	);
}

interface Props {
	setOpenEditModal: Dispatch<SetStateAction<boolean>>;
	setListUpdated: Dispatch<SetStateAction<boolean>>;
	listToBeEdited?: ListData;
}

function EditList({ setOpenEditModal, listToBeEdited, setListUpdated }: Props) {
	const [showMeaning, setShowMeaning] = useState(false);
	const [currentKanjiSelected, setCurrentKanjiSelected] =
		useState<KanjiEntry>({} as KanjiEntry);

	// function getWordDetailsByKanji =

	return (
		<div className={Styles.wrapper}>
			<div className={Styles.edit_list_modal}>
				<Stack
					direction={'row'}
					justifyContent={'space-between'}
					className={Styles.listHeader}
				>
					<h1>{listToBeEdited?.listName}</h1>
					<IconButton
						onClick={() => {
							// vibrate();
							if (showMeaning) return setShowMeaning(false);
							setOpenEditModal((prev) => !prev);
						}}
					>
						{showMeaning ? (
							<Icon
								icon="eva:arrow-back-outline"
								color="var(--orange)"
							/>
						) : (
							<Icon icon="carbon:close" color="red" />
						)}
					</IconButton>
				</Stack>
				<div className={Styles.list_item_wrapper}>
					{showMeaning ? (
						<Infocard kanjiWord={currentKanjiSelected} />
					) : (
						<Stack
							direction={'column'}
							spacing={1}
							marginTop={'10px'}
						>
							{listToBeEdited?.listItems.map(
								(listItem, index) => (
									<ListItem
										key={index}
										item={listItem}
										ln={listToBeEdited.listName}
										setShowMeaning={setShowMeaning}
										setCurrentKanjiSelected={
											setCurrentKanjiSelected
										}
										setListUpdated={setListUpdated}
									/>
								)
							)}
						</Stack>
					)}
				</div>
			</div>
		</div>
	);
}

export default EditList;
