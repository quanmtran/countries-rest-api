import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// Import components
import BorderCountryButton from '../components/BorderCountryButton';
import Loading from '../components/Loading';

function CountryDetail(props) {
	const { match, countryCodeAndName } = props;
	const countryCode = match.params.code;

	const [countryDetail, setCountryDetail] = useState({
		flag: '',
		name: '',
		nativeName: '',
		population: 0,
		region: '',
		subregion: '',
		capital: '',
		topLevelDomain: [],
		currencies: [],
		languages: [],
		borders: [],
	});

	const [detailLoading, setDetailLoading] = useState(true);

	const getCountryDetail = async () => {
		setDetailLoading(true);
		const response = await fetch(
			`https://restcountries.com/v2/alpha/${countryCode}?fields=flag,name,nativeName,population,region,subregion,capital,topLevelDomain,currencies,languages,borders`
		);
		const data = await response.json();
		setCountryDetail(data);
		setDetailLoading(false);
	};

	useEffect(() => {
		getCountryDetail();
	}, [countryCode]);

	return (
		<div className="country-detail-container">
			<div className="back-to-home-btn">
				<Link to="/">
					<span className="material-icons">arrow_back</span>Back
				</Link>
			</div>
			{detailLoading ? (
				<Loading />
			) : (
				<div className="country-detail">
					<img src={countryDetail.flag} alt={`Flag of ${countryDetail.name}`} />
					<div>
						<div>{countryDetail.name}</div>
						<div className="country-detail-text">
							<div>
								<div>
									<span>Native Name: </span>
									{countryDetail.nativeName}
								</div>
								<div>
									<span>Population: </span>
									{countryDetail.population.toLocaleString()}
								</div>
								<div>
									<span>Region: </span>
									{countryDetail.region}
								</div>
								<div>
									<span>Sub Region: </span>
									{countryDetail.subregion}
								</div>
								<div>
									<span>Capital: </span>
									{countryDetail.capital}
								</div>
							</div>
							<div>
								<div>
									<span>Top Level Domain: </span>
									{countryDetail.topLevelDomain[0]}
								</div>
								<div>
									<span>Currencies: </span>
									{countryDetail.currencies ? countryDetail.currencies.map((currency) => currency.name).join(', ') : ''}
								</div>
								<div>
									<span>Languages: </span>
									{countryDetail.languages.map((language) => language.name).join(', ')}
								</div>
							</div>
						</div>
						<div>
							<span>Border Countries: </span>
							{countryDetail.borders
								? countryDetail.borders.map((countryCode) => {
										return <BorderCountryButton key={countryCode} countryCode={countryCode} countryCodeAndName={countryCodeAndName} />;
								  })
								: ''}
						</div>
					</div>
				</div>
			)}
		</div>
	);
}

export default CountryDetail;
