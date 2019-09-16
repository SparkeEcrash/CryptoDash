import React from 'react';

const cc = require('cryptocompare');

export const AppContext = React.createContext();

export class AppProvider extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			page: 'dashboard',
			...this.savedSettings(),
			setPage: this.setPage,
			confirmFavorites: this.confirmFavorites
		}
		//the state properties here can be accessed within the callback functions for
		//AppContext.Consumer rendering (i.e.: AppBar.js)
		//functions can be stored within the state as well such as this.setPage
	}

	componentDidMount = () => {
		this.fetchCoins();
	}

	fetchCoins = async () => {
		let coinList = (await cc.coinList()).Data;
		this.setState({coinList});
	}

	confirmFavorites =() => {
		this.setState({
			firstVisit: false,
			page: 'dashboard'
		});
		localStorage.setItem('cryptoDash', JSON.stringify({
			test: 'hello'
		}));
	}

	savedSettings() {
		let cryptoDashData = JSON.parse(localStorage.getItem('cryptoDash'));
		if(!cryptoDashData) {
			return {page: 'settings', firstVisit: true}
		}
		return {};
	}

	setPage = page => this.setState({page})

	render() {
		return (
			<AppContext.Provider value={this.state}>
				{this.props.children}
			</AppContext.Provider>
		)
	}
}
