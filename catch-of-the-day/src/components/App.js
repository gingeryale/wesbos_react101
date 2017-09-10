import React from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import sampleFishes from '../sample-fishes';
import Fish from './Fish';
import base from '../base';

// when this app initializes it needs to know fish state
// Create a constructor method and call super, before using this
class App extends React.Component {
	constructor() {
		super();
		// bind addFish method to constructor for this
		this.addFish = this.addFish.bind(this);
		this.loadSamples = this.loadSamples.bind(this);
		this.addToOrder = this.addToOrder.bind(this);
		this.updateFish=this.updateFish.bind(this);
		this.removeFish=this.removeFish.bind(this);
		this.removeFromOrder=this.removeFromOrder.bind(this);

		// getInitialState
		this.state = {
			fishes: {},
			order: {}
		};
	}

	componentWillMount(){
		// runs before the <App> is rendered
		this.ref=base.syncState(`${this.props.params.storeId}/fishes`
			,{
				context: this,
				state: 'fishes'
			});
		// check localStrage for orders
		const localStorageRef = localStorage.getItem(`order-${this.props.params.storeId}`);
		if(localStorageRef){
			// upadte App component state
			this.setState({
				order: JSON.parse(localStorageRef)
			})
		}
	}
	componentWillUnmount(){
		base.removeBinding(this.ref);
	}
	componentWillUpdate(nextProps, nextState) {
		//console.log('change');
		//console.log({nextProps, nextState});
		localStorage.setItem(`order-${this.props.params.storeId}`,
			JSON.stringify(nextState.order));
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

	updateFish(key, updatedFish){
		const fishes={...this.state.fishes};
		fishes[key]=updatedFish;
		this.setState({fishes});
	}

	removeFish(key){
		const fishes = {...this.state.fishes};
		fishes[key] = null;
		this.setState({fishes});
	}

	removeFromOrder(key){
		const order = {...this.state.order};
		delete order[key];
		this.setState({order});
	}

	// State lives in our App
	loadSamples() {
		this.setState({
			fishes: sampleFishes
		});
	}
	addToOrder(key) {
		// state copy, object spread
		const order = {...this.state.order};
		// update a new num to order
		order[key] = order[key] + 1 || 1;
		// update state
		this.setState ({order}); // like order: order
	}
	render() {
		return (
			<div className="catch-of-the-day">
				<div className="menu">
					<Header tagline="Fresh Seafood market"/>
					<ul className="list-of-fishes">
					   {
					   	Object
					   	 .keys(this.state.fishes)
					   	 .map(key => <Fish key={key} index={key} 
					   	 	details={this.state.fishes[key]} 
					   	 	addToOrder={this.addToOrder} />)
					   }
					</ul>
				</div>
				<Order 
					fishes={this.state.fishes} 
					order={this.state.order}
					params={this.props.params}
					removeFromOrder={this.removeFromOrder}
				/>
				<Inventory 
					addFish={this.addFish} 
					loadSamples={this.loadSamples} 
					fishes={this.state.fishes}
					updateFish={this.updateFish}
					removeFish={this.removeFish}
					storeId={this.props.params.storeId}
				/>
			</div>
		)
	}
}

App.propTypes={
	params: React.PropTypes.object.isRequired
};

export default App;