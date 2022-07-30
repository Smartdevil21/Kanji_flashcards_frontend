import { Button, CircularProgress, Stack, TextField } from '@mui/material';
import type { NextPage } from 'next';
import { useState, useContext } from 'react';
import Parent from '../../components/parent/Parent';
import Styles from '../../styles/contact/contact.module.scss';
import { StatesContext } from '../_app';
import { feedback } from '../../typings/services/feedback/feedback.service';

const Contact: NextPage = () => {
	const { states } = useContext(StatesContext);
	const [loading, setLoading] = useState(false);
	const [contactMsg, setContactMsg] = useState({
		username: states.username || '',
		email: states.email || '',
		message: '',
	});

	const feedBackTrigger = async () => {
		setLoading(true);
		try {
			if (
				contactMsg.username === '' ||
				contactMsg.email === '' ||
				contactMsg.message === ''
			) {
				alert('Provide proper details!');
				throw new Error('Provide proper details!');
			}
			const response = await feedback(contactMsg);
			alert('Thanks! We appriciate your submission!');
			setContactMsg((prev) => ({ ...prev, message: '' }));
			console.log(response.data);
		} catch (error) {
			console.log(error);
		}
		setLoading(false);
	};

	return (
		<>
			<Parent>
				<div className={Styles.contact}>
					<h2>Feedback/Contact Form</h2>
					<p>
						Help the project by providing your valuable
						feedback/suggesstions/bugs reports...
					</p>
					<div className={Styles.contact_fields}>
						{/* <h3>
							(Please provide appropriate and accurate details.)
						</h3> */}
						<form>
							<Stack direction={'column'} spacing={2}>
								<TextField
									name="Username"
									label="Username"
									required
									value={contactMsg.username}
									autoFocus={!states.username}
									onChange={(e) => {
										setContactMsg((prev) => ({
											...prev,
											username: e.target.value,
										}));
									}}
									variant={'outlined'}
									size={'small'}
								/>
								<TextField
									name="Email"
									label="Email"
									required
									value={contactMsg.email}
									onChange={(e) => {
										setContactMsg((prev) => ({
											...prev,
											email: e.target.value,
										}));
									}}
									variant={'outlined'}
									size={'small'}
								/>
								<TextField
									name="Feedback"
									label="Feedback"
									required
									value={contactMsg.message}
									autoFocus={!!states.username}
									onChange={(e) => {
										setContactMsg((prev) => ({
											...prev,
											message: e.target.value,
										}));
									}}
									variant={'outlined'}
									multiline
									minRows={4}
									size={'small'}
								/>
							</Stack>
							<div className={Styles.submit_btn}>
								<Button
									onClick={feedBackTrigger}
									style={{
										pointerEvents: loading ? 'none' : 'all',
									}}
								>
									{loading ? (
										<CircularProgress
											style={{
												width: '24px',
												height: '24px',
												color: '#f9f9f9',
											}}
										/>
									) : (
										'Submit'
									)}
								</Button>
							</div>
						</form>
					</div>
				</div>
			</Parent>
		</>
	);
};

export default Contact;
