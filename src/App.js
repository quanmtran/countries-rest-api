import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';

// Import components
import Header from './components/Header.jsx';
import Home from './routes/Home.jsx';
import CountryDetail from './routes/CountryDetail.jsx';

function App() {
	const [inputText, setInputText] = useState('');
	const [countries, setCountries] = useState([]);
	const [filterOption, setFilterOption] = useState('All');
	const [filteredCountries, setFilteredCountries] = useState([]);
	const [countryCodeAndName, setCountryCodeAndName] = useState({});
	const [loading, setLoading] = useState(true);
	const [darkmode, setDarkmode] = useState(false);

	// Get darkmode setting from session storage
	const getFromSessionStorage = () => {
		const savedSetting = JSON.parse(sessionStorage.getItem('darkmodeSetting'));

		if (savedSetting) {
			setDarkmode(savedSetting);
		}
	};

	useEffect(() => {
		getFromSessionStorage();
	}, []);

	// Save darkmode setting to session storage
	const saveToSessionStorage = () => {
		sessionStorage.setItem('darkmodeSetting', JSON.stringify(darkmode));
	};

	useEffect(() => {
		saveToSessionStorage();
	}, [darkmode]);

	const darkmodeHandler = () => {
		setDarkmode((prevState) => !prevState);
	};

	const inputTextHandler = (e) => {
		setInputText(e.target.value);
	};

	const clearInputTextHandler = () => {
		setInputText('');
	};

	const filterOptionHandler = (e) => {
		setFilterOption(e.target.value);
	};

	const filterCountriesHandler = () => {
		const regex = new RegExp(`${inputText}`, 'i');

		if (filterOption === 'All') {
			setFilteredCountries(countries.filter((country) => regex.test(country.name)));
		} else {
			setFilteredCountries(countries.filter((country) => regex.test(country.name) && country.region === filterOption));
		}
	};

	useEffect(() => {
		filterCountriesHandler();
	}, [countries, inputText, filterOption]);

	const getData = async () => {
		const response = await fetch('https://restcountries.com/v2/all?fields=flags,alpha3Code,name,population,region,capital');
		const data = await response.json();

		const codeAndNameObj = {};
		data.forEach((country) => (codeAndNameObj[country.alpha3Code] = country.name));

		setCountryCodeAndName(codeAndNameObj);
		setCountries(data);
		setLoading(false);
	};

	useEffect(() => {
		getData();
	}, []);

	return (
		<div className={`App ${darkmode ? 'darkmode' : ''}`}>
			<BrowserRouter>
				<Header darkmodeHandler={darkmodeHandler} />
				<Route
					path="/"
					exact
					render={(props) => (
						<Home
							{...props}
							countries={filteredCountries}
							loading={loading}
							inputText={inputText}
							inputTextHandler={inputTextHandler}
							clearInputTextHandler={clearInputTextHandler}
							filterOptionHandler={filterOptionHandler}
						/>
					)}
				/>
				<Route path="/country-detail/:code" render={(props) => <CountryDetail {...props} countryCodeAndName={countryCodeAndName} />} />
			</BrowserRouter>
		</div>
	);
}

export default App;
