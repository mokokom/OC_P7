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

	/* 	async componentDidMount() {
		let result = await fetch("/restaurants.json");
		let restaurantsResult = await result.json();
		let restaurants = [];
		for (let restaurant of restaurantsResult) {
			let restaurantItem = new RestaurantItem(restaurant);
			restaurants.push(restaurantItem);
		}
		this.setState({ restaurants });
	} */

	getNearbyRestaurants(maps, location) {
		return new Promise((resolve, reject) => {
			const divElmt = document.createElement("div");
			const service = new maps.places.PlacesService(divElmt);
			const request = {
				location: new maps.LatLng(location.lat, location.lng),
				radius: "1500",
				type: ["restaurant"]
			};

			service.nearbySearch(request, (results, status) => {
				let restaurants = [];
				console.log(results);
				if (status == window.google.maps.places.PlacesServiceStatus.OK) {
					for (let result of results) {
						let restaurant = new RestaurantItem({
							restaurantName: result.name,
							description: result.types[0],
							address: result.vicinity,
							lat: result.geometry.location.lat(),
							long: result.geometry.location.lng(),
							ratings: result.rating,
							place_id: result.place_id
						});
						restaurants.push(restaurant);
					}
					resolve(restaurants); /* replace result by restaurants */
				} else {
					reject(status);
				}
			});
		});
	}

	/* Lancer dans map */
	apiLoadedCallback = async (map, maps, location) => {
		console.log(map, maps, location);
		let results = await this.getNearbyRestaurants(maps, location);
		this.setState({ restaurants: results });
	};

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
		console.log(this.state.restaurant);
	};

	handleSubmitFormComment = (restaurant, newComment) => {
		let updatedComment = restaurant.ratings.concat(newComment);
		restaurant.ratings = updatedComment;
		restaurant.averageRating = restaurant.calculaverageRating();
		this.setState({ restaurant });
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

	/* 	test() {
		console.log(this.state.restaurant);
	} */

	render() {
		/* this.test(); */
		/* console.log(this.state); */
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
						apiLoadedCallback={this.apiLoadedCallback}
					/>
				</div>
			</div>
		);
	}
}

export default App;
