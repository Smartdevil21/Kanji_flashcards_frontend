import { AppProps } from 'next/app';
import '../styles/globals.css';
import { createContext, Dispatch, SetStateAction, useEffect, useState } from 'react';

;

export interface IStates   {
	userLoggedIn:boolean;
	practiceOpt:string[];//possible values: kbfr, fbkr
	openHam:boolean;
	windowWidth:number
}

const StatesContext = createContext<
	{ states: IStates; setStates: Dispatch<SetStateAction<IStates>> }
>({
	states:{//initial value of states when the page is first loaded
		userLoggedIn:false,
		practiceOpt:['hiragana'],
		openHam:false,
		windowWidth:0
	},
	setStates:()=>{}
});

function MyApp({ Component, pageProps }: AppProps) {
	const [states, setStates] = useState({
		userLoggedIn: false,
		practiceOpt: ['Hiragana'],
		openHam:false,
		windowWidth: 0
	});
	useEffect(()=>{
		setStates(prev=>({...prev, windowWidth:window.innerWidth}))
	}, [])

	return (
		<StatesContext.Provider value={{ states, setStates }}>
			<Component {...pageProps} />
		</StatesContext.Provider>
	);
}

export default MyApp;
export { StatesContext };
