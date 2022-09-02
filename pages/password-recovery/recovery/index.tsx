import { Button, CircularProgress, Stack, TextField } from "@mui/material";
import Link from "next/link";
import React, { useState } from "react";
import Entrance from "../../../components/Entrance/Entrance";
import Styles from "../../../styles/login/login.module.scss";
import { useRouter } from "next/router";
import { changePassword } from "../../../typings/services/user/changePassword.service";


function PasswordRecovery() {
	const [loading, setLoading] = useState(false);
	const router = useRouter();

	const [newPassword, setNewPassword] = useState({
		password: "",
		confirmPassword: "",
	});

	async function updateInfo(){
		setLoading(true);
		try {
			if(!router.query.uid)return;
			if(newPassword.password !== newPassword.confirmPassword){
				setLoading(false);
				return alert("Passwords don't match!");
			};
			const result = await changePassword({uid:router.query.uid as string, updatedPass:newPassword.password});
			if(result.data.success)throw new Error("Something went wrong while updating the password!");
			setLoading(false);	
			alert("Password Updated Successfully!");
		} catch (error) {
			console.log(`Err in updating the password: ${error}`);
		};
		setLoading(false);
	}

	return (
		<Entrance>
			<div className={Styles.login}>
            <h3>Enter your new password:</h3>
						<form onSubmit={(e)=>{
							e.preventDefault();
							updateInfo();
						}}>
							<Stack spacing={2} direction={"column"}>
								<TextField
									type={"password"}
									label={"Enter new password"}
									value={newPassword.password}
									size={"small"}
									onChange={(e) => {
										setNewPassword((prev) => ({
											...prev,
											password: e.target.value,
										}));
									}}
								/>
								<TextField
									type={"password"}
									label={"Confirm new password"}
									size={"small"}
									value={newPassword.confirmPassword}
									onChange={(e) => {
										setNewPassword((prev) => ({
											...prev,
											confirmPassword: e.target.value,
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
											"Update Password"
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
