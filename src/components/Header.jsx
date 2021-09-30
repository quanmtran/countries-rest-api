import React from 'react';
import { Link } from 'react-router-dom';

export default function Header(props) {
	const { darkmodeHandler } = props;

	return (
		<header>
			<div className="header-container">
				<Link to="/">
					<div className="header-title">Where in the world?</div>
				</Link>
				<div className="dark-mode-btn" onClick={darkmodeHandler}>
					<span className="material-icons">dark_mode</span>
					Dark Mode
				</div>
			</div>
		</header>
	);
}
