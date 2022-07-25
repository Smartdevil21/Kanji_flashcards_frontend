import {
	Stack,
	IconButton,
	Fab,
	Box,
	Modal,
	TextField,
	Button,
} from '@mui/material';
import React, { useState } from 'react';
import Parent from '../../../components/parent/Parent';
import Styles from '../../../styles/userLists.module.scss';
import { Icon } from '@iconify/react';
import AddList from '../../../components/Modals/AddList/AddList';

function List() {
	return (
		<div className={Styles.lists}>
			<div className={Styles.list_curtain}></div>
			<h3>List Heading</h3>
			<p>
				花,花,花,花,花,花,花,花,花,花,花,花,花,花,花,花,花,花,花,花,花,花,花,花,花,花,花,花,花,花,花,花,花,花,花,花,花,花,花,花,花,花,花,花,花,花,花,花,花,花,花,花,花,花,
				花,花,花,花,花,花,花,花,花,花,花,花,花,花,花,花,花,花,花,花,花,花,花,花,花,花,花,花,花,花,花,花,花,花,花,花,花,花,花,花,花,花,花,花,花,花,花,花,花,花,花,花,花,花
			</p>
			<Stack
				direction={'row'}
				spacing={1}
				justifyContent={'flex-end'}
				className={Styles.list_control_btns}
			>
				<IconButton>
					<Icon icon="ci:edit" />
				</IconButton>
				<IconButton>
					<Icon icon="ant-design:delete-twotone" />
				</IconButton>
			</Stack>
		</div>
	);
}

function UserLists() {
	const [openAddListModal, setopenAddListModal] = useState(false);
	const [listName, setListName] = useState('');
	return (
		<Parent>
			<div className={Styles.userlists}>
				<h1>Your Lists</h1>
				<Stack direction={'row'} className={Styles.list_container}>
					<List />
					<List />
					<List />
					<List />
					<List />
					<List />
				</Stack>

				<div className={Styles.add_list_btn}>
					<IconButton
						onClick={() => {
							setopenAddListModal(true);
						}}
					>
						<Icon
							icon="fluent:add-24-filled"
							color="#f9f9f9"
							width={'32px'}
						/>
					</IconButton>
				</div>
				<Modal open={openAddListModal}>
					<AddList setopenAddListModal={setopenAddListModal} setListName={setListName} listName={listName} />
				</Modal>
			</div>
		</Parent>
	);
}

export default UserLists;
