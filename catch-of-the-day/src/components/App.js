import React from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import sampleFishes from '../sample-fishes';
import Fish from './Fish';

// when this app initializes it needs to know fish state
// Create a constructor method and call super, before using this
class App extends React.Component {
	constructor() {
		super();
		// bind addFish method to constructor for this
		this.addFish = this.addFish.bind(this);
		this.loadSamples = this.loadSamples.bind(this);

		// getInitialState
		this.state = {
			fishes: {},
			order: {}
		};
	}
	// add addFish to constructor method
	addFish(fish){
		// update state
           const fishes = {...this.state.fishes}// add to existing state and put into spread
		// Add new fish in using timestamp
           const timeStamp = Date.now(); // milisec since jan 1 1970
           fishes[`fish-${timeStamp}`] = fish // passing addFish method
		// set state specific piece of state
		   this.setState( { fishes} ); // fishes: fishes in es6 don't need both fishes
	}

	// State lives in our App
	loadSamples() {
		this.setState({
			fishes: sampleFishes
		});
	}

	render() {
		return (
			<div className="catch-of-the-day">
				<div className="menu">
					<Header tagline="Fresh Seafood market"/>
					<ul className="list-of-fishes">
					   {
					   	Object.keys(this.state.fishes)
					   	.map(key => <Fish key={key} details={this.state.fishes[key]} />)
					   }
					</ul>
				</div>
				<Order />
				<Inventory addFish={this.addFish} loadSamples={this.loadSamples} />
			</div>
		)
	}
}


export default App;