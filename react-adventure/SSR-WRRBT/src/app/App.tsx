
import React from 'react';
import { Component } from 'react';
import logo from "./assets/images/Flap.png";
import picture from './assets/images/leading.jpeg';

class App extends Component {

	render() {
		return (
			<div className="App">
				<header className="App-header">
					<img src={logo} className="App-logo" alt="logo" />
					<h1 className="App-title">Welcome to React</h1>
				</header>
				<p className="App-intro">
					To get started, edit <code>App.js</code> and save to reload.
        		</p>
				<img src={picture} className="App-picture" alt="picture" />
			</div>
		);
	}
}

export default App;