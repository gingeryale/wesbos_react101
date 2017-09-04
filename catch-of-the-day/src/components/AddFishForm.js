import React from 'react';


class AddFishForm extends React.Component {
	//method of CreateFish click submit links action to form
	createFish(e) {
		e.preventDefault();
		console.log('added fish');
		// use refs inside form to referece inside method
		const fish = {
			name: this.name.value,
			price: this.price.value,
			status: this.status.value,
			desc: this.desc.value,
			image: this.image.value,
		}
		console.log(fish); 
		// we have fish object need to send to state
		this.props.addFish(fish); // inventory component ref in method
	    this.fishForm.reset();
	}

	render() {
		return (
			<form ref={(input)=>this.fishForm=input} className="fish-edit" onSubmit={(e)=>this.createFish(e)}>
			<input ref={(input)=>this.name=input} type="text" placeholder="Fish Name" />
			<input ref={(input)=>this.price=input} type="text" placeholder="Fish Price" />
			<select>
				<option ref={(input)=>this.status=input} value="available">Fresh!</option>
				<option value="unavailable">Sold Out!</option>
			</select>
			<textarea ref={(input)=>this.desc=input} type="text" placeholder="Fish Desc" />
			<input ref={(input)=>this.image=input} type="text" placeholder="Fish Image" />
			<button type="submit">+ Add Item</button>
			</form>
		)
	}
}


export default AddFishForm;