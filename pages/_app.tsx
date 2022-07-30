import { AppProps } from 'next/app';
import '../styles/globals.css';
import {
	createContext,
	Dispatch,
	SetStateAction,
	useEffect,
	useState,
} from 'react';
import { loginWithToken } from '../typings/services/user/loginWithToken.service';
import { getAllKanjisByLevel } from '../typings/services/kanjis/getAllKanjisByLevels.service';
import axios from 'axios';
import { CircularProgress } from '@mui/material';
import { getUserLists } from '../typings/services/lists/getUserLists.service';

const cookieCutter = require('cookie-cutter');

export interface IStates {
	userLoggedIn: boolean;
	practiceOpt: string[]; //possible values: kbfr, fbkr
	openHam: boolean;
	windowWidth: number;
	uid?: string;
	email_verified: boolean;
	listNames: string[];
	username?:string;
	email?:string
}

const StatesContext = createContext<{
	states: IStates;
	setStates: Dispatch<SetStateAction<IStates>>;
}>({
	states: {
		//initial value of states when the page is first loaded
		userLoggedIn: false,
		practiceOpt: ['Kanji[N5]'],
		openHam: false,
		windowWidth: 0,
		email_verified: false,
		listNames: ['Bookmarks'],
		uid: '',
		username:'',
		email:''
	},
	setStates: () => {},
});

function MyApp({ Component, pageProps }: AppProps) {
	const [states, setStates] = useState({
		userLoggedIn: false,
		practiceOpt: ['Kanji[N5]'],
		openHam: false,
		windowWidth: 0,
		email_verified: false,
		listNames: ['Bookmarks']
	});

	const [loading, setLoading] = useState(true);

	const tryLogIn = async () => {
		if (cookieCutter.get('t')) {
			try {
				const response = await loginWithToken({
					token: cookieCutter.get('t'),
				});
				setStates((prev) => ({
					...prev,
					userLoggedIn: true,
					email_verified: !!response.data.data?.emailVerified,
					uid: response.data.data?._id,
					username: response.data.data?.username,
					email:response.data.data?.email
				}));
			} catch (error) {
				console.log(error);
			}
		}
		setLoading(false);
	};

	useEffect(() => {
		tryLogIn();
		setStates((prev) => ({ ...prev, windowWidth: window.innerWidth }));
	}, []);

	return (
		<StatesContext.Provider value={{ states, setStates }}>
			{!loading ? (
				<Component {...pageProps} />
			) : (
				<div className="loading_screen">
					<CircularProgress style={{ color: 'var(--orange)' }} />
					<p>Warming up the servers...</p>
				</div>
			)}
		</StatesContext.Provider>
	);
}

export default MyApp;
export { StatesContext };
