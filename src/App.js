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
			formView: false,
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
		/* restaurants update */
		console.log(newComment);
		let updatedComment = restaurant.ratings.concat(newComment);
		console.log(updatedComment);
		let restaurantObj = [...this.state.restaurants];
		console.log(restaurantObj);
		let findRestaurant = restaurantObj.indexOf(restaurant);
		console.log(findRestaurant);
		let theRestaurant = { ...restaurantObj[findRestaurant] };
		console.log(theRestaurant);
		theRestaurant.ratings = updatedComment;
		restaurantObj[findRestaurant] = theRestaurant;
		this.setState({ restaurants: restaurantObj });

		/* Restaurant update */
		/* console.log(newComment);
		let updatedComment = restaurant.ratings.concat(newComment); */
		console.log(updatedComment);
		let theRestaurantTargeted = { ...restaurant };
		theRestaurantTargeted.ratings = updatedComment;
		console.log(theRestaurantTargeted);
		this.setState({ restaurant: theRestaurantTargeted });
		console.log(this.state.restaurants);
		console.log(this.state.restaurant);
	};

	getLatLng = (lat, lng) => {
		/* console.log(`lat: ${lat} et lng: ${lng}`); newRestaurantPosition*/
		let LatLngOnClick = {
			lat,
			lng
		};
		this.setState({ newRestaurantPosition: LatLngOnClick });
		console.log(this.state.newRestaurantPosition);
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
						handleSubmitForm={this.handleSubmitForm}
						handleSubmitFormComment={this.handleSubmitFormComment}
						newRestaurantPosition={this.state.newRestaurantPosition}
						/* rating={this.state.rating}
						newRating={this.state.newRating} */
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
