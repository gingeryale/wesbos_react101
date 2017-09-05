import React from 'react';
import { formatPrice } from '../helpers';


class Order extends React.Component {
	constructor(){
		super();
		this.renderOrder=this.renderOrder.bind(this);
	}
	renderOrder(key){
		const fish = this.props.fishes[key];
		const count = this.props.order[key];

		if(!fish || fish.status === 'unavailable') 
		{
			return <li key={key}>Sorry, {fish ? fish.name : 'fish'} 
			is no longer available</li>
		}
		return(
		<li key={key}>
			<span>{count}lbs {fish.name}</span>
			<span className="price">{formatPrice(count * fish.price)}</span>
		</li>
		)
	}

	render() {
		// order got passed down via props we want an array of all the keys
		const orderIds = Object.keys(this.props.order);
		// displays key
		const total = orderIds.reduce((prevTotal, key)=>{
			const fish=this.props.fishes[key];
			const count=this.props.order[key];
			const isAvailable=fish && fish.status === 'available';
			if(isAvailable){
				return prevTotal + (count * fish.price || 0)
				}
				return prevTotal;
				}, 0); // starting val is zero

		return (
			<div className="order-wrap">
				<h2>Your Order</h2>
				{orderIds.map(this.renderOrder)}
				<ul className="order">
				<li className="total"><b>Total:</b>{formatPrice(total)}</li>
				</ul>
			</div>
		)
	}
}


export default Order;