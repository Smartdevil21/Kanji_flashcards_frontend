import { Button, CircularProgress, Stack, TextField } from "@mui/material";
import Link from "next/link";
import React, { useState } from "react";
import Entrance from "../../components/Entrance/Entrance";
import Styles from "../../styles/login/login.module.scss";
import { sendUserRecoveryEmail } from "../../typings/services/user/sendUserRecoveryEmail.service";

function PasswordRecovery() {
	const [loading, setLoading] = useState(false);
	const [enteredDetails, setUserDetails] = useState({
		username: "",
		email: "",
	});

	async function sendUserRecoveryEmailTrigger() {
		setLoading(true);
		try {
			if (enteredDetails.username === "" && enteredDetails.email === "")
				return alert("Please provide username or email first!");
			const result = await sendUserRecoveryEmail(enteredDetails);
			if (!result.data.success) throw new Error("Something went wrong!");
			alert("Recovery email sent successfully!");
		} catch (error) {
			console.log(`${error}`);
		}
		setLoading(false);
	}

	return (
		<Entrance>
			<div className={Styles.login}>
				<h3>Forgot your password?</h3>
				{/* eslint-disable-next-line react/no-unescaped-entities */}
				<h3>Don't worry, we've got you covered!</h3>
				<form
					onSubmit={(e) => {
						e.preventDefault();
						sendUserRecoveryEmailTrigger();
					}}
				>
					<Stack spacing={2} direction={"column"}>
						<TextField
							autoFocus={true}
							size="small"
							label="Username"
							type={"text"}
							value={enteredDetails.username}
							onChange={(e) => {
								setUserDetails((prev) => ({
									...prev,
									username: e.target.value,
								}));
							}}
						/>
						<h4>
							<u>OR</u>
						</h4>
						<TextField
							size="small"
							label="Email"
							type={"email"}
							value={enteredDetails.email}
							onChange={(e) => {
								setUserDetails((prev) => ({
									...prev,
									email: e.target.value,
								}));
							}}
						/>
						<div className={Styles.login_btn}>
							<Button type="submit">
								{loading ? (
									<CircularProgress
										style={{
											color: "#f9f9f9",
											width: "24px",
											height: "24px",
										}}
									/>
								) : (
									"Send Recovery Email!"
								)}
							</Button>
						</div>
					</Stack>
				</form>
			</div>
		</Entrance>
	);
}

export default PasswordRecovery;
