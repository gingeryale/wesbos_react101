import React from 'react';
import { getFunName } from '../helpers';


class StorePicker extends React.Component {
	goToStore(e) {
		//first grab value of box
		// direct to correct url
		// console.log('you changed url');
		e.preventDefault();
		console.log(this.storeInput.value);
		const storeId = this.storeInput.value;
		console.log(`Going to ${storeId}`);
		this.context.router.transitionTo(`/store/${storeId}`);
	}

	render() {
		return (
			<form className="store-selector" onSubmit={(e)=>this.goToStore(e)}>
				<h2>Please Enter A store</h2>
				<input type="text" required placeholder="Store Name" defaultValue={getFunName()} ref={(input)=>{this.storeInput=input}} />
				<button type="submit">Visit Store</button>
			</form>
		)
	}
}

StorePicker.contextTypes = {
	router: React.PropTypes.object
}


export default StorePicker;