import React from 'react';
import Parent from '../../components/parent/Parent';
import Styles from '../../styles/howToUse/howToUse.module.scss';

function index() {
	return (
		<Parent>
			<div className={Styles.howToUse}>
				<h1>How to use guide</h1>
			</div>
		</Parent>
	);
}

export default index;
