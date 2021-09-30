import React from 'react';

export default function SearchAndFilter(props) {
	const { inputText, inputTextHandler, clearInputTextHandler, filterOptionHandler } = props;

	return (
		<div className="search-and-filter">
			<div className="search">
				<span className="material-icons">search</span>
				<input type="text" placeholder="Search for a country" value={inputText} onChange={inputTextHandler} />
				{inputText ? (
					<span class="material-icons clear-input-btn" onClick={clearInputTextHandler}>
						cancel
					</span>
				) : (
					''
				)}
			</div>
			<div>
				<select name="region-filter" id="region-filter" defaultValue="All" onChange={filterOptionHandler}>
					<option value="All">All regions</option>
					<option value="Africa">Africa</option>
					<option value="Americas">Americas</option>
					<option value="Asia">Asia</option>
					<option value="Europe">Europe</option>
					<option value="Oceania">Oceania</option>
				</select>
			</div>
		</div>
	);
}
