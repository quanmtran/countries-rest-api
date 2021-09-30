import React from 'react';
import { Link } from 'react-router-dom';

export default function BorderCountryButton(props) {
	const { countryCode, countryCodeAndName } = props;

	return (
		<Link to={`/country-detail/${countryCode}`}>
			<div className="border-country-btn">{countryCodeAndName[countryCode]}</div>
		</Link>
	);
}
