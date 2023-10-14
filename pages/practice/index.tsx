import React, { useEffect, useState, useContext } from "react";
import Parent from "../../components/parent/Parent";
import Styles from "../../styles/practice/practice.module.scss";
import CheckboxElement from "../../components/Checkbox/Checkbox";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { StatesContext } from "../_app";
import { Button, CircularProgress } from "@mui/material";
import Link from "next/link";
import { getUserLists } from "../../typings/services/lists/getUserLists.service";
import { useRouter } from "next/router";
import { vibrate } from "../../utils/vibrate.helper";

function Practice() {
	const router = useRouter();
	const { states, setStates } = useContext(StatesContext);
	const [mode, setMode] = useState("single-select");
	const [userListNames, setUserListNames] = useState<string[]>([]);
	const [loading, setLoading] = useState(false);

	const handleChange = (
		event: React.MouseEvent<HTMLElement>,
		newMode: string
	) => {
		setMode(newMode);
	};

	const getUserListTrigger = async () => {
		if (!states.username) return router.push("/");
		setLoading(true);
		try {
			const response = await getUserLists({ uid: states.uid as string });
			response.data.data.map((ele, index) => {
				setUserListNames((prev) => {
					if (prev.indexOf(ele.listName) === -1) {
						return [...prev, ele.listName];
					}
					return prev;
				});
			});
		} catch (error) {
			console.log(error);
		}
		setLoading(false);
	};

	useEffect(() => {
		getUserListTrigger();
	}, []);

	return (
		<Parent>
			{!loading ? (
				<div className={Styles.practice}>
					<h1>Choose the classes you want to practice:</h1>
					<ToggleButtonGroup
						color="primary"
						value={mode}
						exclusive
						onChange={handleChange}
						size={"small"}
					>
						<ToggleButton
							value="single-select"
							disabled={states.practiceOpt.length > 1}
						>
							Single-Select
						</ToggleButton>
						<ToggleButton value="multi-select">
							Multi-Select
						</ToggleButton>
					</ToggleButtonGroup>
					<div className={Styles.classes}>
						<h3>Basic:</h3>
						<div className={Styles.classes_container}>
							{/* <CheckboxElement
								opt={'Hiragana'}
								ans={''}
								selected={states?.practiceOpt}
								setState={setStates}
								mode={mode}
							/>
							<CheckboxElement
								opt={'Katakana'}
								ans={''}
								selected={states?.practiceOpt}
								setState={setStates}
								mode={mode}
							/> */}
							<CheckboxElement
								opt={"Kanji[N5]"}
								ans={""}
								selected={states?.practiceOpt}
								setState={setStates}
								mode={mode}
							/>
							<CheckboxElement
								opt={"Kanji[N4]"}
								ans={""}
								selected={states?.practiceOpt}
								setState={setStates}
								mode={mode}
							/>
							<CheckboxElement
								opt={"Kanji[N3]"}
								ans={""}
								selected={states?.practiceOpt}
								setState={setStates}
								mode={mode}
							/>
							{/*
							<CheckboxElement
								opt={'Kanji[N2]'}
								ans={''}
								selected={states?.practiceOpt}
								setState={setStates}
								mode={mode}
							/>
							<CheckboxElement
								opt={'Kanji[N1]'}
								ans={''}
								selected={states?.practiceOpt}
								setState={setStates}
								mode={mode}
							/> */}
						</div>
					</div>
					<br />
					<div className={Styles.classes}>
						<h3>Your Lists</h3>
						<div className={Styles.classes_container}>
							{userListNames.map((ele, index) => (
								<>
									<CheckboxElement
										key={index}
										opt={ele}
										ans={""}
										selected={states?.practiceOpt}
										setState={setStates}
										mode={mode}
									/>
								</>
							))}
						</div>
					</div>
					<div
						className={Styles.nxt}
						style={{
							pointerEvents:
								states.practiceOpt.length === 0
									? "none"
									: "all",
							opacity: states.practiceOpt.length === 0 ? 0.5 : 1,
						}}
					>
						<Link href={"/practice/type"} passHref>
							<Button onClick={vibrate}>Next</Button>
						</Link>
					</div>
				</div>
			) : (
				<CircularProgress
					style={{
						color: "var(--orange)",
					}}
				/>
			)}
		</Parent>
	);
}

export default Practice;
