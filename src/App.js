import React, { Component } from "react";
import RestaurantsList from "./Components/RestaurantsList";
import Map from "./Components/Map";
import RestaurantItem from "./Components/RestaurantItem.js";
/* import "bootstrap/dist/css/bootstrap.css"; */
import "./App.css";

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			restaurants: [],
			restaurant: {},
			restaurantsListView: true,
			formView: false
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
		this.setState({ restaurants });
	}

	handleClick = restaurant => {
		this.setState({
			restaurant: restaurant,
			restaurantsListView: false
		});
	};

	closeRestaurantTargetView = () => {
		this.setState({ restaurantsListView: true });
		let targetedMarker = document.querySelector(".targeted-marker");
		if (targetedMarker) {
			targetedMarker.className = "marker";
		}
	};

	render() {
		return (
			<div className="main-content-container container-fluid d-flex flex-column">
				<div className="row">
					<RestaurantsList
						restaurants={this.state.restaurants}
						restaurant={this.state.restaurant}
						restaurantsListView={this.state.restaurantsListView}
						closeRestaurantTargetView={this.closeRestaurantTargetView}
						handleClick={this.handleClick}
					/>
					<Map
						restaurants={this.state.restaurants}
						handleClick={this.handleClick}
					/>
				</div>
			</div>
		);
	}
}

export default App;
