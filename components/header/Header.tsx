import { IconButton, Stack } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { NextPage } from 'next';
import Styles from './Header.module.scss';
import { StatesContext } from '../../pages/_app';
import { Button } from '@mui/material';
import Link from 'next/link';
import { vibrate } from '../../utils/vibrate.helper';

const Header: NextPage = () => {
	const { states, setStates } = useContext(StatesContext);

	return (
		<header className={Styles.header}>
			<Link href={'/'} passHref onClick={vibrate}><h1>Kanji Flashcards</h1></Link>
			<Stack
				direction={'row'}
				alignItems={'center'}
				spacing={2}
				justifyContent={'center'}
			>
				{/* <div className={Styles.theme_toggler}></div> */}

				{states.userLoggedIn && states.windowWidth > 750 &&states.username? (
					<IconButton onClick={vibrate}>{states.username[0]}</IconButton>
				) : (
					<div className={Styles.log_btns}>
						<Stack spacing={2} direction={'row'}>
							<Link href={'/login'} passHref ><Button className={Styles.login_btn}>Log in</Button></Link>
							<Link href={'/sign-up'} passHref><Button>Sign Up</Button></Link>
						</Stack>
					</div>
				)}
				<div
					className={`${Styles.hamburger} ${
						states.openHam && Styles.openHam
					}`}
					onClick={() => {
						setStates((prev) => ({
							...prev,
							openHam: !states.openHam,
						}));
					}}
				>
					<div className={`${Styles.line1}`}></div>
					<div className={`${Styles.line2}`}></div>
					<div className={`${Styles.line3}`}></div>
				</div>
			</Stack>
		</header>
	);
};

export default Header;
