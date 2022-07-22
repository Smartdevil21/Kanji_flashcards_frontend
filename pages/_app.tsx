import { AppProps } from 'next/app';
import '../styles/globals.css';
import { createContext, Dispatch, SetStateAction, useState } from 'react';

;

export interface IStates   {
	userLoggedIn:boolean;
	practiceOpt:string[];//possible values: kbfr, fbkr
}

const StatesContext = createContext<
	{ states: IStates; setStates: Dispatch<SetStateAction<IStates>> }
>({
	states:{//initial value of states when the page is first loaded
		userLoggedIn:false,
		practiceOpt:['hiragana'],
	},
	setStates:()=>{}
});

function MyApp({ Component, pageProps }: AppProps) {
	const [states, setStates] = useState({
		userLoggedIn: false,
		practiceOpt: ['Hiragana'],
	});

	return (
		<StatesContext.Provider value={{ states, setStates }}>
			<Component {...pageProps} />
		</StatesContext.Provider>
	);
}

export default MyApp;
export { StatesContext };
