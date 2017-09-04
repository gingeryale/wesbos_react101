import React from 'react';
import AddFishForm from './AddFishForm';


class Inventory extends React.Component {
	render() {
		return (
			<div className="inventory">
				<h2>Inventory</h2>
				<AddFishForm addFish={this.props.addFish} /> // pass data from func thru props, access func inside form
			</div>
		)
	}
}


export default Inventory;