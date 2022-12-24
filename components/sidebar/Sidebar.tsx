import type { NextPage } from "next";
import { useState, useContext, useEffect } from "react";
import Styles from "./Sidebar.module.scss";
import Link from "next/link";
import { Button, Stack } from "@mui/material";
import { Icon } from "@iconify/react";
import { StatesContext } from "../../pages/_app";
import Router from "next/router";
import { vibrate } from "../../utils/vibrate.helper";
const cookieCutter = require("cookie-cutter");

const Sidebar: NextPage = () => {
	const { states, setStates } = useContext(StatesContext);
	const pagename = Router.pathname.split("/")[1];
	function closeHam() {
		if (window.innerWidth > 750) return;
		setStates((prev) => ({ ...prev, openHam: false }));
	}

	function logout() {
		cookieCutter.set("t", "", { expires: new Date(0) });
		setStates((prev) => ({
			...prev,
			userLoggedIn: false,
			uid: "",
			username: "",
			email: "",
			lists: [],
		}));
		Router.push("/");
		closeHam();
	}

	return (
		<div
			className={Styles.sidebar}
			style={{
				height:
					states.windowWidth < 750
						? states.openHam
							? "calc(100vh - 70px)"
							: "00vh"
						: "",
			}}
		>
			<nav>
				<ul>
					<li
						onClick={closeHam}
						className={`${Styles.sidebar_links} ${
							pagename === "" && Styles.sidebar_link_active
						}`}
					>
						<Link href="/">Home</Link>
					</li>
					{/* <li className={Styles.sidebar_links}>
						<Link href='/profile'>Profile</Link>
					</li> */}
					{states.userLoggedIn && states.email_verified && (
						<>
							<li
								onClick={closeHam}
								className={`${Styles.sidebar_links} ${
									pagename === "user-lists" &&
									Styles.sidebar_link_active
								}`}
							>
								<Link href={`/user-lists/${states.uid}`}>
									My Lists
								</Link>
							</li>
							<li
								onClick={closeHam}
								className={`${Styles.sidebar_links} ${
									pagename === "practice" &&
									Styles.sidebar_link_active
								}`}
							>
								<Link href="/practice">Practice</Link>
							</li>
						</>
					)}
					<li
						onClick={closeHam}
						className={`${Styles.sidebar_links} ${
							pagename === "contact" && Styles.sidebar_link_active
						}`}
					>
						<Link href="/contact">Contact</Link>
					</li>
					<li
						onClick={closeHam}
						className={`${`${Styles.sidebar_links} ${
							pagename === "how-to-use" &&
							Styles.sidebar_link_active
						}`}`}
					>
						<Link href="/how-to-use">Hidden Features</Link>
					</li>
					<li className={`${Styles.sidebar_links} ${Styles.logout}`}>
						{states.userLoggedIn ? (
							<Button onClick={logout}>
								<Icon icon="mdi:logout" />
								Logout
							</Button>
						) : (
							states.windowWidth < 750 && (
								<Stack
									direction={"row"}
									alignItems={"center"}
									spacing={2}
								>
									<Link href={"/login"} passHref>
										<Button onClick={closeHam}>
											Login
										</Button>
									</Link>
									<Link href={"/sign-up"} passHref>
										<Button onClick={closeHam}>
											Signup
										</Button>
									</Link>
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
