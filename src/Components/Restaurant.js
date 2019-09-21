import React, { Component } from "react";
import StarRatingComponent from "react-star-rating-component";
import "./Restaurant.css";

export default class Restaurant extends Component {
	constructor(props) {
		super(props);
		this.state = {
			/* rating: 0 */
			rating: Number(this.props.restaurant.averageRating)
		};
		/* this.onStarClick = this.onStarClick.bind(this); */
	}

	/* componentDidMount() {
		let averageRate = this.props.restaurant.averageRating;
		this.setState({ rating: averageRate });
	} */

	handleClick(restaurant) {
		/* 		console.log(restaurant); */
		/* this.props.handleClick(this.props.restaurant); */
		let targetedMarker = document.querySelector(".targeted-marker");
		if (targetedMarker) {
			targetedMarker.className = "marker";
		}

		let selectedRestaurant = document.getElementById(restaurant.id);
		selectedRestaurant.classList.add("targeted-marker");

		if (restaurant.place_id) {
			this.handleDetailsRequest(restaurant);
		} else {
			this.props.handleClick(this.props.restaurant);
		}

		/* var request = {
			placeId: restaurant.place_id,
			fields: ["name", "rating", "formatted_phone_number", "reviews"]
		};

		const callback = (place, status) => {
			if (status == window.google.maps.places.PlacesServiceStatus.OK) {
				restaurant.reviews = place.reviews;
				this.props.handleClick(this.props.restaurant);
			}
		};
		const divElmt = document.createElement("div");
		const service = new window.google.maps.places.PlacesService(divElmt);
		service.getDetails(request, callback); */
	}

	handleDetailsRequest(restaurant) {
		var request = {
			placeId: restaurant.place_id,
			fields: ["name", "rating", "formatted_phone_number", "reviews", "photos"]
		};

		const callback = (place, status) => {
			if (status == window.google.maps.places.PlacesServiceStatus.OK) {
				restaurant.reviews = place.reviews;
				restaurant.photos = place.photos;
				this.props.handleClick(this.props.restaurant);
			}
		};
		const divElmt = document.createElement("div");
		const service = new window.google.maps.places.PlacesService(divElmt);
		service.getDetails(request, callback);
	}

	handleMouseOver(restaurant) {
		/* this.props.handleClick(this.props.restaurant); */
		let targetedMarker = document.querySelector(".targeted-marker");
		if (targetedMarker) {
			targetedMarker.className = "marker hvr-grow";
		}
		let selectedRestaurant = document.getElementById(restaurant);
		selectedRestaurant.classList.add("targeted-marker");
	}

	handleMouseLeave() {
		let targetedMarker = document.querySelector(".targeted-marker");
		if (targetedMarker) {
			targetedMarker.className = "marker hvr-grow";
		}
	}

	render() {
		const { rating } = this.state;
		return (
			<div
				className="card restaurant-card container-fluid mb-3 p-2 hvr-shrink "
				onClick={() => this.handleClick(this.props.restaurant)}
				onMouseOver={() => this.handleMouseOver(this.props.restaurant.id)}
				onMouseLeave={() => {
					this.handleMouseLeave();
				}}
			>
				<div className="row">
					<div className="col-lg-6 col-12 text-center text-lg-right">
						<h3 className="restaurant-name">{this.props.restaurant.name}</h3>
						<div className="no-pointer">
							<StarRatingComponent name="rate1" starCount={5} value={rating} />
						</div>
						<p className="card-text">{this.props.restaurant.description}</p>
						<p className="card-text">{this.props.restaurant.address}</p>
					</div>

					<div className="restaurant-img-container col-lg-6 col-12 d-flex justify-content-center align-items-center">
						<img
							className="img-fluid"
							src={`https://maps.googleapis.com/maps/api/streetview?size=200x200&location=${this.props.restaurant.address}&fov=50&heading=235&pitch=0&key=AIzaSyCLYVIY0XkB_QofM2PhdfuojhlLESBGioo`}
							alt="restaurant view"
						/>
					</div>
				</div>
			</div>
		);
	}
}
