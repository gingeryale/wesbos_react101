import React from 'react';
import AddFishForm from './AddFishForm';
import base from '../base';


class Inventory extends React.Component {
	constructor() {
		super();
		this.renderInventory=this.renderInventory.bind(this);
		this.handleChange=this.handleChange.bind(this);
		this.authenticate=this.authenticate.bind(this);
		this.authHandler=this.authHandler.bind(this);
		this.renderLogin=this.renderLogin.bind(this);
		this.logout=this.logout.bind(this);


		this.state={
			uid: null,
			owner: null
		} 
	}

	componentDidMount(){
		base.onAuth((user)=>{
			if(user){
				this.authHandler(null, {user});
			}
		})
	}

	handleChange(e, key){
		const fish = this.props.fishes[key];
		// console.log(fish) console.log(e.target.name, e.target.value)
		// make copy of the fish state and update with new data
		const updatedFish={...fish,
			[e.target.name]: e.target.value
		}
		this.props.updateFish(key, updatedFish);
	}

	authenticate(provider){
		console.log(`trying to log in with ${provider}`);
		base.authWithOAuthPopup(provider, this.authHandler);
	}

	logout(){
		base.unauth();
		this.setState({uid: null});
	}

	authHandler(err, authData){
		console.log(authData);
		if(err){
			console.log(err);
			return;
		}
		const storeRef = base.database().ref(this.props.storeId);
		// query firebase once for store data
		storeRef.once('value', (snapshot)=>{
			const data=snapshot.val() || {};
			// claim ownership if none found
			if(!data.owner){
				storeRef.set({
					owner: authData.user.uid
				});
			}

			this.setState({
				uid: authData.user.uid,
				owner: data.owner || authData.user.uid
			});
		})
	}

	renderLogin(){
		return(
			<nav className="login">
			<h2>Inventory</h2>
				<p>Sign in to manage your store's inventory</p>
				<button className="github" onClick={()=>this.authenticate('github')}>Login with Github</button>
				<button className="twitter" onClick={()=>this.authenticate('twitter')}>Login with Twitter</button>
				<button className="facebook" onClick={()=>this.authenticate('facebook')}>Login with Facebook</button>

			</nav>
			)
	}

	renderInventory(key){
		const fish = this.props.fishes[key];
		return(
			<div className="fish-edit" key={key}>
				<input type="text" name="name" value={fish.name} placeholder="fish name" onChange={(e)=>this.handleChange(e, key)}/>

				<input type="text" name="price" value={fish.price} placeholder="fish price" onChange={(e)=>this.handleChange(e, key)}/>
				
				<select type="text" name="status" value={fish.status} placeholder="fish status" onChange={(e)=>this.handleChange(e, key)}>
					<option value="available">Fresh!</option>
					<option value="unavailable">Sold Out!</option>
				</select>

				<textarea type="text" name="desc" value={fish.desc} placeholder="fish desc" onChange={(e)=>this.handleChange(e, key)}></textarea>

				<input type="text" name="image" value={fish.image} placeholder="fish image" onChange={(e)=>this.handleChange(e, key)}/>
			<button onClick={()=>this.props.removeFish(key)}>Remove Fish</button>
			</div>
			)
	}

	render() {
		const logout=<button onClick={this.logout}>Log Out!</button>
		if(!this.state.uid){
			return <div>{this.renderLogin()}</div>
		}

		if(this.state.uid !== this.state.owner){
			return(
					<div>
						<p>Sorry you aren't the owner of the store</p>
						{logout}
					</div>
				)
		}
		return (
			<div className="inventory">
				<h2>Inventory</h2>
				{logout}
				<AddFishForm addFish={this.props.addFish} /> 
				{Object.keys(this.props.fishes).map(this.renderInventory)}
				{/* pass data from func thru props, access func inside form */}
				<button onClick={this.props.loadSamples}>Load Sample Fishes</button>
			</div>
		)
	}
}

Inventory.propTypes={
	//fishes: React.Proptypes.object.isRequired,
	//updateFish: React.Proptypes.func.isRequired,
	removeFish: React.PropTypes.func.isRequired,
	addFish: React.PropTypes.func.isRequired,
	storeId: React.PropTypes.string.isRequired,
	loadSamples: React.PropTypes.func.isRequired
};

export default Inventory;
