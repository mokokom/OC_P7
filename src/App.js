import React, { Component } from "react";
import RestaurantsList from "./Components/RestaurantsList";
import Map from "./Components/Map";
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
		};
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

	handleSubmitFormComment = (restaurant, newComment, rating) => {
		let updatedComment = restaurant.reviews.concat({
			author_name: newComment.author,
			rating: newComment.stars,
			text: newComment.comment
		});
		restaurant.reviews = updatedComment;
		restaurant.user_ratings_total++;
		restaurant.newAverageRating = restaurant.getAverageRating();
		this.setState({ restaurant });
	};

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
	};

	closeRestaurantTargetView = () => {
		this.setState({ restaurantsListView: true });
		let targetedMarker = document.querySelector(".targeted-marker");
		if (targetedMarker) {
			targetedMarker.className = "marker";
		}
		this.setState({
			newRestaurantPosition: {
				LatLngOnClick: null,
				address: null,
				postalCode: null
			}
		});
	};

	apiLoadedCallback = restaurants => {
		this.setState({ restaurants });
	};

	render() {
		console.log(this.state.restaurants);
		console.log(this.state.restaurant);
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
