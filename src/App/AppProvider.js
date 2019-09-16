import React from 'react';

export const AppContext = React.createContext();

export class AppProvider extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			page: 'settings',
			setPage: this.setPage
		}
		//the state properties here can be accessed within the callback functions for
		//AppContext.Consumer rendering (i.e.: AppBar.js)
		//functions can be stored within the state as well such as this.setPage
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
