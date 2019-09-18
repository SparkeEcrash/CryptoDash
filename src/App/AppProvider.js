import React from 'react';
import _ from 'lodash';

const cc = require('cryptocompare');

export const AppContext = React.createContext();

const MAX_FAVORITES = 10;

export class AppProvider extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			page: 'dashboard',
			favorites: ['BTC' ,'ETH', 'XMR', 'DOGE'],
			...this.savedSettings(),
			setPage: this.setPage,
			addCoin: this.addCoin,
			removeCoin: this.removeCoin,
			isInFavorites: this.isInFavorites,
			confirmFavorites: this.confirmFavorites,
			setCurrentFavorite: this.setCurrentFavorite,
			setFilteredCoins: this.setFilteredCoins
		}
		//the state properties here can be accessed within the callback functions for
		//AppContext.Consumer rendering (i.e.: AppBar.js)
		//functions can be stored within the state as well such as this.setPage
	}

	addCoin = key => {
		let favorites = [...this.state.favorites];
		if(favorites.length < MAX_FAVORITES) {
			favorites.push(key);
			this.setState({favorites});
		}
	}

	removeCoin = key => {
		let favorites = [...this.state.favorites];
		this.setState({favorites: _.pull(favorites,key)});
	}

	isInFavorites = key => _.includes(this.state.favorites ,key);

	componentDidMount = () => {
		this.fetchCoins();
		this.fetchPrices();
	}

	fetchCoins = async () => {
		let coinList = (await cc.coinList()).Data;
		this.setState({coinList});
	}

	fetchPrices = async () => {
		if(this.state.firstVisit) return;
		let prices = await this.prices();
		//await for the array of promises to resolve?
		prices = prices.filter(price => Object.keys(price).length);
		//if there is no tile in dashboard it means it got filtered out
		this.setState({prices});
	}

	prices = async () => {
		let returnData = [];
		for(let i = 0; i < this.state.favorites.length; i++) {
			try {
				let priceData = await cc.priceFull(this.state.favorites[i], 'USD');
				returnData.push(priceData);
			} catch(e) {
				console.warn('Fetch price error: ', e);
			}
		}
		return returnData;
	}

	confirmFavorites =() => {
		let currentFavorite = this.state.favorites[0];
		this.setState({
			firstVisit: false,
			currentFavorite,
			page: 'dashboard'
		}, () => {
			this.fetchPrices();
		});
		localStorage.setItem('cryptoDash', JSON.stringify({
			favorites: this.state.favorites,
			currentFavorite
		}));
	}

	setCurrentFavorite = (sym) => {
		this.setState({
			currentFavorite: sym
		});
		localStorage.setItem('cryptoDash', JSON.stringify({
			...JSON.parse(localStorage.getItem('cryptoDash')),
			currentFavorite: sym
		}))
	}

	savedSettings() {
		let cryptoDashData = JSON.parse(localStorage.getItem('cryptoDash'));
		if(!cryptoDashData) {
			return {page: 'settings', firstVisit: true}
		}
		let {favorites, currentFavorite} = cryptoDashData;
		//favorites is an array object with list of favorites
		return {favorites, currentFavorite};
		//savedSettings needs to return an object {} containing the array of the favorites
		//so it can use the spread operator to replace the default favorites array state property
	}

	setPage = page => this.setState({page});

	setFilteredCoins = (filteredCoins) => this.setState({filteredCoins});

	render() {
		return (
			<AppContext.Provider value={this.state}>
				{this.props.children}
			</AppContext.Provider>
		)
	}
}
