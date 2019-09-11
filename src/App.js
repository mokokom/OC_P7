import React, { Component } from "react";
import RestaurantsList from "./Components/RestaurantsList";
import Map from "./Components/Map";
import RestaurantItem from "./Components/RestaurantItem.js";
import "./App.css";

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			restaurants: [],
			restaurant: {},
			restaurantsListView: true,
			Form: false,
			rating: 0,
			newRating: 0,
			newRestaurantPosition: null
		};
	}

	async componentDidMount() {
		let result = await fetch("/restaurants.json");
		let restaurantsResult = await result.json();
		let restaurants = [];
		for (let restaurant of restaurantsResult) {
			let restaurantItem = new RestaurantItem(restaurant);
			restaurants.push(restaurantItem);
			/* console.log(restaurant); */
		}
		this.setState({ restaurants });
	}

	handleSubmitForm = newRestaurant => {
		this.setState(prevState => {
			return {
				restaurants: prevState.restaurants.concat(newRestaurant)
			};
		});
	};

	handleClick = restaurant => {
		this.setState({
			restaurant: restaurant,
			restaurantsListView: false
		});
	};

	handleSubmitFormComment = (restaurant, newComment) => {
		console.log(restaurant);
		let updatedComment = restaurant.ratings.concat(newComment);
		console.log(updatedComment);
		restaurant.ratings = updatedComment;
		console.log(restaurant);
		restaurant.averageRating = restaurant.calculaverageRating();
		console.log(restaurant);
		this.setState({ restaurant });
		/* Restaurants update */
		/* let updatedComment = restaurant.ratings.concat(newComment);
		let restaurantObj = [...this.state.restaurants];
		let findRestaurant = restaurantObj.indexOf(restaurant);
		let theRestaurant = { ...restaurantObj[findRestaurant] };
		theRestaurant.ratings = updatedComment;
		restaurantObj[findRestaurant] = theRestaurant;
		this.setState({ restaurants: restaurantObj, restaurant: restaurantObj }); */

		/* Restaurant update */
		/* let theRestaurantTargeted = { ...restaurant };
		theRestaurantTargeted.ratings = updatedComment;
		this.setState({ restaurant: theRestaurantTargeted }); */
		/* console.log(this.state.restaurants);
		console.log(this.state.restaurant); */
	};

	getLatLng = (lat, lng) => {
		let LatLngOnClick = {
			lat,
			lng
		};
		this.setState({ newRestaurantPosition: LatLngOnClick });
	};

	closeRestaurantTargetView = () => {
		this.setState({ restaurantsListView: true });
		let targetedMarker = document.querySelector(".targeted-marker");
		if (targetedMarker) {
			targetedMarker.className = "marker";
		}
	};

	test() {
		console.log(this.state.restaurant);
		/* console.log(this.state.restaurant.calculaverageRating); */
		/* return this.state.restaurant.calculaverageRating; */
	}

	render() {
		this.test();
		return (
			<div className="main-content-container container-fluid d-flex flex-column">
				<div className="row">
					<RestaurantsList
						restaurants={this.state.restaurants}
						restaurant={this.state.restaurant}
						restaurantsListView={this.state.restaurantsListView}
						closeRestaurantTargetView={this.closeRestaurantTargetView}
						handleClick={this.handleClick}
						handleSubmitForm={this.handleSubmitForm}
						handleSubmitFormComment={this.handleSubmitFormComment}
						newRestaurantPosition={this.state.newRestaurantPosition}
					/>
					<Map
						restaurants={this.state.restaurants}
						handleClick={this.handleClick}
						getLatLng={this.getLatLng}
					/>
				</div>
			</div>
		);
	}
}

export default App;
