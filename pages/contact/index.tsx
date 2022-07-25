import { Button, Stack, TextField } from '@mui/material';
import type { NextPage } from 'next';
import { useState } from 'react';
import Parent from '../../components/parent/Parent';
import Styles from '../../styles/contact/contact.module.scss';

const Contact: NextPage = () => {
	const [contactMsg, setContactMsg] = useState({
		username: '',
		email: '',
		message: '',
	});
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
						<h3>
							(Please provide appropriate and accurate details.)
						</h3>
						<form>
							<Stack direction={'column'} spacing={2}>
								<TextField
									name="Username"
									label="Username"
									required
									value={contactMsg.username}
									autoFocus
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
									onChange={(e) => {
										setContactMsg((prev) => ({
											...prev,
											message: e.target.value,
										}));
									}}
									variant={'filled'}
									multiline
									minRows={4}
									size={'small'}
								/>
							</Stack>
							<div className={Styles.submit_btn}>
								<Button>Submit</Button>
							</div>
						</form>
					</div>
				</div>
			</Parent>
		</>
	);
};

export default Contact;
