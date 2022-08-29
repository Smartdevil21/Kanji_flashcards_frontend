import { Button, CircularProgress, Stack, TextField } from '@mui/material';
import Link from 'next/link';
import React, { useState, useContext } from 'react';
import Entrance from '../../components/Entrance/Entrance';
import Styles from '../../styles/login/login.module.scss';
import { loginUser } from '../../typings/services/user/loginUser.service';
import { StatesContext } from '../_app';
import Router from 'next/router';
import { vibrate } from '../../utils/vibrate.helper';
const cookieCutter = require('cookie-cutter');

function Login() {
	const { states, setStates } = useContext(StatesContext);
	const [loading, setLoading] = useState(false);
	const [loginDetails, setLoginDetails] = useState({
		username: '',
		password: '',
	});

	async function loginFunc() {
		vibrate();
		setLoading(true);
		try {
			const response = await loginUser(loginDetails);
			alert('Welcome!');
			cookieCutter.set('t', response.data.t, {expires: new Date(Date.now() + 8640000)});
			setStates((prev) => ({
				...prev,
				uid: response.data.data?._id,
				userLoggedIn: true,
				email_verified: response.data.data?.emailVerified || false,
				email: response.data.data?.email,
				username: response.data.data?.username,
			}));
			Router.push('/');
		} catch (error) {
			alert('Username or Passsword is incorrect!');
			console.log(error);
		}
		setLoading(false);
	}

	return (
		<Entrance>
			<div className={Styles.login}>
				<h3>Hey user, how have you been?</h3>
				<form onSubmit={(e)=>{
					e.preventDefault();
					loginFunc();
				}}>
				<Stack spacing={2} direction={'column'}>
					<TextField
						autoFocus={true}
						size="small"
						label="Username"
						type={'text'}
						value={loginDetails.username}
						onChange={(e) => {
							setLoginDetails((prev) => ({
								...prev,
								username: e.target.value,
							}));
						}}
					/>
					<TextField
						size="small"
						label="Password"
						type={'password'}
						value={loginDetails.password}
						onChange={(e) => {
							setLoginDetails((prev) => ({
								...prev,
								password: e.target.value,
							}));
						}}
					/>
					<div className={Styles.login_btn}>
						<Button type='submit'>
							{loading ? (
								<CircularProgress
									style={{
										color: '#f9f9f9',
										width: '24px',
										height: '24px',
									}}
								/>
							) : (
								'Login'
							)}
						</Button>
						<p>
							{/* eslint-disable-next-line react/no-unescaped-entities */}
							Don't have an account?{' '}
							<Link href="sign-up" passHref>
								Create One
							</Link>
						</p>
					</div>
				</Stack>
				</form>
			</div>
		</Entrance>
	);
}

export default Login;
