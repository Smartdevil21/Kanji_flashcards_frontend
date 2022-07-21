import { IconButton, Stack } from '@mui/material';
import { useContext } from 'react';
import { NextPage } from 'next';
import Styles from './Header.module.scss';
import { StatesContext } from '../../pages/_app';
import { Button } from '@mui/material';

const Header: NextPage = () => {
	const { states } = useContext(StatesContext);

	return (
		<header className={Styles.header}>
			<h1>Kanji Flashcards</h1>
			{
				<Stack
					direction={'row'}
					alignItems={'center'}
					spacing={2}
					justifyContent={'center'}
				>
					<div className={Styles.theme_toggler}></div>

					{states.userLoggedIn ? (
						<IconButton>P</IconButton>
					) : (
						<div className={Styles.log_btns}>
							<Stack spacing={2} direction={'row'}>
								<Button>Log in</Button>
								<Button>Sign Up</Button>
							</Stack>
						</div>
					)}
				</Stack>
			}
		</header>
	);
};

export default Header;
