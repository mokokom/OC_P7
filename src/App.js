import React, { Component } from "react";
import "./App.css";
import RestaurantsList from "./Components/RestaurantsList";
import Map from "./Components/Map";
import "bootstrap/dist/css/bootstrap.css";
import RestaurantItem from "./Components/RestaurantItem.js";

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			restaurants: [],
			restaurant: {}
		};
	}

	async componentDidMount() {
		let result = await fetch("/restaurants.json");
		let restaurantsResult = await result.json();
		let restaurants = [];
		for (let restaurant of restaurantsResult) {
			let restaurantItem = new RestaurantItem(restaurant);
			restaurants.push(restaurantItem);
		}
		console.log(restaurants);
		this.setState({ restaurants });
	}

	render() {
		return (
			<div className="App container-fluid">
				<div className="row">
					<RestaurantsList restaurants={this.state.restaurants} />
					<Map restaurants={this.state.restaurants} />
				</div>
			</div>
		);
	}
}

export default App;
