import { NextPage } from 'next';
import React from 'react';
import Header from '../header/Header';
import Sidebar from '../sidebar/Sidebar';
import Styles from './Parent.module.scss';

type Props = {
	children: React.ReactNode;
};

const Parent = ({ children }: Props) => {
	return (
		<div className={Styles.container}>
			<Sidebar />
			<Header />
			<main className={Styles.main}>{children}</main>
		</div>
	);
};

export default Parent;
