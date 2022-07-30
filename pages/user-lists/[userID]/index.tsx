import {
	Stack,
	IconButton,
	Fab,
	Box,
	Modal,
	TextField,
	Button,
	CircularProgress,
} from '@mui/material';
import React, {
	useState,
	useEffect,
	useContext,
	Dispatch,
	SetStateAction,
} from 'react';
import Parent from '../../../components/parent/Parent';
import Styles from '../../../styles/userLists.module.scss';
import { Icon } from '@iconify/react';
import AddList from '../../../components/Modals/AddList/AddList';
import EditList from '../../../components/Modals/EditList/EditList';
import { StatesContext } from '../../_app';
import { getUserLists } from '../../../typings/services/lists/getUserLists.service';
import { ListData } from '../../../typings/interfaces/lists/getUserLists.interface';
import { updateList } from '../../../typings/services/lists/updateList.service';
import { useRouter } from 'next/router';

function List({
	list,
	setOpenEditModal,
	setListToBeEdited,
	uid,
	setUserListsDetails,
}: {
	list: ListData;
	setOpenEditModal: Dispatch<SetStateAction<boolean>>;
	setListToBeEdited: Dispatch<SetStateAction<ListData>>;
	uid: string;
	setUserListsDetails: React.Dispatch<
		React.SetStateAction<ListData[] | undefined>
	>;
}) {
	const [loading, setLoading] = useState(false);
	async function deleteList() {
		setLoading(true);
		try {
			const confirmation = confirm('You sure you want to delete?');
			if (confirmation) {
				const response = await updateList({
					listName: list.listName,
					uid,
					action: 'deleteList',
				});
				setUserListsDetails((prev) =>
					prev?.filter((ele) => ele !== list)
				);
			}
		} catch (error) {
			console.log(error);
		}
		setLoading(false);
	}

	return (
		<div className={Styles.lists}>
			<div className={Styles.list_curtain}></div>
			<h3>{list.listName}</h3>
			<p>{list.listItems.map((ele: string) => `${ele} ,`)}</p>
			<Stack
				direction={'row'}
				spacing={1}
				justifyContent={'flex-end'}
				className={Styles.list_control_btns}
			>
				<IconButton
					onClick={() => {
						setOpenEditModal((prev) => !prev);
						setListToBeEdited(list);
					}}
				>
					<Icon icon="ci:edit" />
				</IconButton>
				{list.listName !== 'Bookmarks' && (
					<IconButton
						onClick={deleteList}
						style={{ pointerEvents: loading ? 'none' : 'all' }}
					>
						{loading ? (
							<CircularProgress
								style={{
									color: 'var(--orange)',
									width: '24px',
									height: '24px',
								}}
							/>
						) : (
							<Icon icon="ant-design:delete-twotone" />
						)}
					</IconButton>
				)}
			</Stack>
		</div>
	);
}

function UserLists() {
	const { states, setStates } = useContext(StatesContext);
	const router = useRouter();
	const [openAddListModal, setopenAddListModal] = useState(false);
	const [openEditModal, setOpenEditModal] = useState(false);
	const [userListsDetails, setUserListsDetails] = useState<ListData[]>();
	const [listToBeEdited, setListToBeEdited] = useState<ListData>({
		listName: '',
		listItems: [],
		__v: 0,
		_id: '',
		userID: '',
	});
	const [loading, setLoading] = useState(false);

	const getUserListEntryDetails = async () => {
		if (!states.username) return router.push('/');
		setLoading(true);
		try {
			const response = await getUserLists({ uid: states.uid as string });
			setUserListsDetails(response.data.data);
		} catch (error) {
			console.log(error);
		}
		setLoading(false);
	};

	useEffect(() => {
		if (!openEditModal && !openAddListModal) {
			getUserListEntryDetails();
		}
	}, [openEditModal, openAddListModal]);

	return (
		<Parent>
			<div className={Styles.userlists}>
				{!loading ? (
					userListsDetails && (
						<>
							<h1>Your Lists</h1>
							<Stack
								direction={'row'}
								className={Styles.list_container}
							>
								{userListsDetails.map((list, index) => {
									return (
										<List
											key={index}
											list={list}
											setOpenEditModal={setOpenEditModal}
											setListToBeEdited={
												setListToBeEdited
											}
											uid={states.uid as string}
											setUserListsDetails={
												setUserListsDetails
											}
										/>
									);
								})}
							</Stack>
						</>
					)
				) : (
					<CircularProgress style={{ color: 'var(--orange)' }} />
				)}

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
					<>
						<AddList setopenAddListModal={setopenAddListModal} />
					</>
				</Modal>
				<Modal open={openEditModal}>
					<>
						<EditList
							setOpenEditModal={setOpenEditModal}
							listToBeEdited={listToBeEdited}
						/>
					</>
				</Modal>
			</div>
		</Parent>
	);
}

export default UserLists;
