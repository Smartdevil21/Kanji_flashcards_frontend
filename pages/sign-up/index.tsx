import { Button, CircularProgress, Stack, TextField } from '@mui/material';
import Link from 'next/link';
import React, { useState, useContext } from 'react';
import Entrance from '../../components/Entrance/Entrance';
import Styles from '../../styles/login/login.module.scss';
import { createUser } from '../../typings/services/user/createUser.service';
import { StatesContext } from '../_app';
import Router from 'next/router';
import { vibrate } from '../../utils/vibrate.helper';

const cookieCutter = require('cookie-cutter');

function Signup() {
	const { states, setStates } = useContext(StatesContext);
	const [loading, setLoading] = useState(false);
	const [errmsg, setErrmsg] = useState('');
	const [userDetails, setUSerDetails] = useState({
		username: '',
		email: '',
		password: '',
		confirmPassword: '',
	});

	async function signUpTrigger() {
		vibrate();
		setLoading(true);
		try {
			const { username, email, password } = userDetails;
			if (userDetails.confirmPassword === userDetails.password) {
				const response = await createUser({
					username,
					email,
					password,
				});
				cookieCutter.set('t', response.data.t, {expires: new Date(Date.now() + 8640000)});
				setStates((prev) => ({
					...prev,
					userLoggedIn: true,
					uid: response.data.data._id,
					email_verified: response.data.data?.emailVerified || false,
					email: response.data.data?.email,
					username: response.data.data?.username,
				}));
				Router.push('/');
			} else {
				setErrmsg("Passwords don't match!");
			}
		} catch (error) {
			alert('Something went wrong!');
			console.log(error);
		}
		setLoading(false);
	}

	return (
		<Entrance>
			<div className={Styles.login}>
				{/* eslint-disable-next-line react/no-unescaped-entities */}
				<h3>We're happy to have you onboard!</h3>
				<Stack spacing={2} direction={'column'}>
					<TextField
						autoFocus={true}
						size="small"
						label="Username"
						type={'text'}
						value={userDetails.username}
						onChange={(e) => {
							setUSerDetails((prev) => ({
								...prev,
								username: e.target.value,
							}));
						}}
					/>
					<TextField
						size="small"
						label="Email"
						type={'text'}
						value={userDetails.email}
						onChange={(e) => {
							setUSerDetails((prev) => ({
								...prev,
								email: e.target.value,
							}));
						}}
					/>
					<TextField
						size="small"
						type="password"
						label="Password"
						value={userDetails.password}
						onChange={(e) => {
							setUSerDetails((prev) => ({
								...prev,
								password: e.target.value,
							}));
						}}
					/>
					<TextField
						size="small"
						type="password"
						label="Confirm Password"
						value={userDetails.confirmPassword}
						onChange={(e) => {
							setUSerDetails((prev) => ({
								...prev,
								confirmPassword: e.target.value,
							}));
						}}
					/>
					<strong
						style={{
							color: 'red',
							fontSize: '12px',
							textAlign: 'right',
						}}
					>
						{errmsg}
					</strong>
					<div className={Styles.login_btn}>
						<Button onClick={signUpTrigger}>
							{loading ? (
								<CircularProgress
									style={{
										color: '#f9f9f9',
										width: '24px',
										height: '24px',
									}}
								/>
							) : (
								'Create Account'
							)}
						</Button>
						{/* eslint-disable-next-line react/no-unescaped-entities */}
						<p>
							Already have an account?{' '}
							<Link href="/login" passHref>
								Log-in
							</Link>
						</p>
					</div>
				</Stack>
			</div>
		</Entrance>
	);
}

export default Signup;
