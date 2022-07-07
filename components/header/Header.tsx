import { IconButton, Stack } from '@mui/material';
import { NextPage } from 'next';
import Styles from './Header.module.scss';

const Header: NextPage = () => {
	return (
		<header className={Styles.header}>
			<h1>Kanji Flashcards</h1>
			<Stack direction={"row"} alignItems={"center"} spacing={2} justifyContent={"center"}>
				<div className={Styles.theme_toggler}></div>
				<IconButton>P</IconButton>
			</Stack>
		</header>
	);
};

export default Header;
