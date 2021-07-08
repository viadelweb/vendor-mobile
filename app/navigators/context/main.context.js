import React, { Component } from 'react';

const mainContext = {
	currentUser: '',
	sessionToken: ''	
};

const MainContext = React.createContext();

class MainContextProvider extends Component {
	render() {
		return (
			<MainContext.Provider value={mainContext}>
				{this.props.children}
			</MainContext.Provider>
		)
	}
}

export {
	MainContext,
	MainContextProvider
}
