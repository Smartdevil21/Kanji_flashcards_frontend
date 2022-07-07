import type { NextPage } from 'next';
import Styles from './Sidebar.module.scss';
import Link from 'next/link';

const Sidebar: NextPage = () => {
	return (
		<div className={Styles.sidebar}>
			<nav>
				<ul>
					<li className={`${Styles.sidebar_links} ${Styles.sidebar_link_active}`}>
						<Link href='/'>Home</Link>
					</li>
					<li className={Styles.sidebar_links}>
						<Link href='/profile'>Profile</Link>
					</li>
					<li className={Styles.sidebar_links}>
						<Link href='/user-lists'>My Lists</Link>
					</li>
					<li className={Styles.sidebar_links}>
						<Link href='/practice'>Practice</Link>
					</li>
					<li className={Styles.sidebar_links}>
						<Link href='/contact'>Contact</Link>
					</li>
					<li className={`${Styles.sidebar_links}`}>
						<Link href='/how-to-use'>How to use</Link>
					</li>
					<li className={`${Styles.sidebar_links}`} >
						<Link href='/logout'>Logout</Link>
					</li>
				</ul>
			</nav>
		</div>
	);
};

export default Sidebar;
