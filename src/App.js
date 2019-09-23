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
			newRestaurantPosition: {
				LatLngOnClick: null,
				address: null,
				postalCode: null
			}
			/* newRestaurantPosition: null */
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

	/* getNearbyRestaurants(maps, location) {
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
					resolve(restaurants);
				} else {
					reject(status);
				}
			});
		});
	}

	apiLoadedCallback = async (map, maps, location) => {
		let results = await this.getNearbyRestaurants(maps, location);
		this.setState({ restaurants: results });
		this.handleSearchBox(map);
	};

	handleSearchBox(map) {
		let input = document.getElementById("search");
		let searchBox = new window.google.maps.places.SearchBox(input);
		map.addListener("bounds_changed", () => {
			searchBox.setBounds(map.getBounds());
		});
		searchBox.addListener("places_changed", () => {
			var places = searchBox.getPlaces();
			let restaurants = [];
			for (let result of places) {
				let restaurant = new RestaurantItem({
					restaurantName: result.name,
					description: result.types[0],
					address: result.formatted_address,
					lat: result.geometry.location.lat(),
					long: result.geometry.location.lng(),
					ratings: result.rating,
					place_id: result.place_id
				});
				restaurants.push(restaurant);
			}
			this.setState({ restaurants });
		});
	}
 */
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
		let updatedComment = restaurant.reviews.concat({
			author_name: newComment.author,
			rating: newComment.stars,
			text: newComment.comment
		});
		restaurant.reviews = updatedComment;
		this.setState({ restaurant });
	};
	/* handleSubmitFormComment = (restaurant, newComment) => {
		let updatedComment = restaurant.ratings.concat(newComment);
		restaurant.ratings = updatedComment;
		restaurant.averageRating = restaurant.calculaverageRating();
		this.setState({ restaurant });
	}; */

	getLatLng = (lat, lng, formatted_address) => {
		let LatLngOnClick = {
			lat,
			lng
		};
		let splitAdress = formatted_address.split(",");
		let address = splitAdress[0];
		let postalCode = splitAdress[1] + splitAdress[2];
		this.setState({
			newRestaurantPosition: { LatLngOnClick, address, postalCode }
		});
		/* this.setState({ newRestaurantPosition: LatLngOnClick }); */
	};

	closeRestaurantTargetView = () => {
		this.setState({ restaurantsListView: true });
		let targetedMarker = document.querySelector(".targeted-marker");
		if (targetedMarker) {
			targetedMarker.className = "marker";
		}
	};

	searchBoxSetState = restaurants => {
		this.setState({ restaurants });
	};

	render() {
		/* this.test(); */
		/* console.log(this.state); */
		/* console.log(window); */
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
						searchBoxSetState={this.searchBoxSetState}
					/>
				</div>
			</div>
		);
	}
}

export default App;
