import React from 'react';
import { Link } from 'react-router-dom';

export default function CountryCard(props) {
	const { flagURL, code, name, population, region, capital } = props;

	return (
		<Link to={`/country-detail/${code}`}>
			<div className="country-card">
				<img src={flagURL} alt={`Flag of ${name}`} />
				<div className="country-card-detail">
					<div>{name}</div>
					<div>
						<span>Population: </span>
						{population.toLocaleString()}
					</div>
					<div>
						<span>Region: </span>
						{region}
					</div>
					<div>
						<span>Capital: </span>
						{capital}
					</div>
				</div>
			</div>
		</Link>
	);
}
