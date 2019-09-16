import React from 'react';
import styled from 'styled-components';
import {backgroundColor2, fontSize2} from '../Shared/Styles';
import {AppContext} from "../App/AppProvider";
import _ from 'lodash';
import fuzzy from 'fuzzy';

const SearchGrid = styled.div`
	display: grid;
	grid-template-columns: 200px 1fr;
`
const SearchInput = styled.input`
	${backgroundColor2};
	${fontSize2};
	border: 1px solid;
	height: 25px;
	color: #1163c9;
	place-self: center left;
`

/*WRONG BECAUES YOU ARE INVOKING HANDLEFILTER EACH TIME WITH KEYUP*/
// const handleFilter = (inputValue, coinList, setFilteredCoins) => {
// 	_.debounce((inputValue, coinList, setFilteredCoins) => {
// 		console.log(inputValue)
// 	}, 500)(inputValue);
// }


/*CORRECT BECAUES YOU NEED TO REPLACE WITH DEBOUNEC FUNCTION WHICH WILL
BE INVOKED ON TIME INTERVALS*/
const handleFilter = _.debounce((inputValue, coinList, setFilterCoins) => {
	console.log(coinList);
	// Get all the coin symbols
	let coinSymbols = Object.keys(coinList);
	console.log(coinSymbols);
	// Get all the coin names, map symbol to name
	let coinNames = coinSymbols.map(sym => coinList[sym].CoinName);
	//Combining two arrays together with one array being coinSymbols and the second array being coinNames
	let allStringsToSearch = coinSymbols.concat(coinNames);
	//Do third party custom filtering from package called 'fuzzy'
	let fuzzyResults = fuzzy
		.filter(inputValue, allStringsToSearch, {})
		.map(result => result.string);

	//remove duplicate coins that were added because symbol string and name string were both
	//picked up by fuzzy.filter when filtering the array that combined two arrays of
	//of duplicate coins for symbols and names

	//this filters out coinList which contain only one copy of the coin list and picks out
	//whether there had been a match either for symbol of the coin or for the name of the coin
	let filteredCoins = _.pickBy(coinList, (result, symKey) => {
		let coinName = result.CoinName;
		return (_.includes(fuzzyResults, symKey) || _.includes(fuzzyResults, coinName))
	});

	setFilterCoins(filteredCoins);

}, 500);

function filterCoins(e, setFilteredCoins, coinList){
	let inputValue = e.target.value;
	//you cannot run empty input values into handleFilter and into the debounce function or it will bug out the app
	if(!inputValue){
		setFilteredCoins(null);
		return;
	}

	handleFilter(inputValue, coinList, setFilteredCoins);
}

export default function() {
	return ( 
		<AppContext.Consumer>
			{({setFilteredCoins, coinList}) => 
			<SearchGrid>
				<h2>Search all coins</h2>
				<SearchInput onKeyUp={(e) => filterCoins(e, setFilteredCoins, coinList)}></SearchInput>
			</SearchGrid>
			}
		</AppContext.Consumer>
	)
}