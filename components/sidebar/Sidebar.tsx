import type { NextPage } from 'next';
import { useState, useContext, useEffect } from 'react';
import Styles from './Sidebar.module.scss';
import Link from 'next/link';
import { Button, Stack } from '@mui/material';
import { Icon } from '@iconify/react';
import { StatesContext } from '../../pages/_app';
import Router from 'next/router';
const cookieCutter = require('cookie-cutter');

const Sidebar: NextPage = () => {
	const { states, setStates } = useContext(StatesContext);

	function closeHam() {
		if (window.innerWidth > 750) return;
		setStates((prev) => ({ ...prev, openHam: false }));
	}

	function logout() {
		cookieCutter.set('t', '', { expires: new Date(0) });
		setStates((prev) => ({ ...prev, userLoggedIn: false, uid: '' }));
		Router.push('/');
	}

	return (
		<div
			className={Styles.sidebar}
			style={{
				height:
					states.windowWidth < 750
						? states.openHam
							? '90vh'
							: '00vh'
						: '',
			}}
		>
			<nav>
				<ul>
					<li
						onClick={closeHam}
						className={`${Styles.sidebar_links} ${Styles.sidebar_link_active}`}
					>
						<Link href="/">Home</Link>
					</li>
					{/* <li className={Styles.sidebar_links}>
						<Link href='/profile'>Profile</Link>
					</li> */}
					{(states.userLoggedIn && states.email_verified) && (
						<>
							<li
								onClick={closeHam}
								className={Styles.sidebar_links}
							>
								<Link href={`/user-lists/${states.uid}`}>My Lists</Link>
							</li>
							<li
								onClick={closeHam}
								className={Styles.sidebar_links}
							>
								<Link href="/practice">Practice</Link>
							</li>
						</>
					)}
					<li onClick={closeHam} className={Styles.sidebar_links}>
						<Link href="/contact">Contact</Link>
					</li>
					<li
						onClick={closeHam}
						className={`${Styles.sidebar_links}`}
					>
						<Link href="/how-to-use">How to use</Link>
					</li>
					<li className={`${Styles.sidebar_links} ${Styles.logout}`}>
						{states.userLoggedIn ? (
							<Button
								style={{
									textTransform: 'none',
									fontSize: 18,
									color: 'var(--grey)',
								}}
								onClick={logout}
							>
								<Icon icon="mdi:logout" />
								Logout
							</Button>
						) : (
							states.windowWidth < 750 && (
								<Stack
									direction={'row'}
									alignItems={'center'}
									spacing={2}
								>
									<Button>Login</Button>
									<Button>Signup</Button>
								</Stack>
							)
						)}
					</li>
				</ul>
			</nav>
		</div>
	);
};

export default Sidebar;
