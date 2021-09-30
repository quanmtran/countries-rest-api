import React from 'react';

// Import components
import CountryCard from '../components/CountryCard.jsx';
import Loading from '../components/Loading.jsx';
import SearchAndFilter from '../components/SearchAndFilter.jsx';
import Attribution from '../components/Attribution';

function Home(props) {
	const { countries, loading, inputText, inputTextHandler, clearInputTextHandler, filterOptionHandler } = props;

	return (
		<div className="home">
			<SearchAndFilter
				inputText={inputText}
				inputTextHandler={inputTextHandler}
				clearInputTextHandler={clearInputTextHandler}
				filterOptionHandler={filterOptionHandler}
			/>
			<div className="country-cards">
				{loading ? (
					<Loading />
				) : (
					countries.map((country) => {
						return (
							<CountryCard
								key={country.alpha3Code}
								code={country.alpha3Code}
								flagURL={country.flags.svg}
								name={country.name}
								population={country.population}
								region={country.region}
								capital={country.capital}
							/>
						);
					})
				)}
			</div>
			<Attribution />
		</div>
	);
}

export default Home;
