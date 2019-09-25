import React, { Component } from "react";
import StarRatingComponent from "react-star-rating-component";
import "./Restaurant.css";

export default class Restaurant extends Component {
	constructor(props) {
		super(props);
		this.state = {
			rating: Number(this.props.restaurant.averageRating)
		};
	}

	handleClick(restaurant) {
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
	}

	handleDetailsRequest(restaurant) {
		var request = {
			placeId: restaurant.place_id,
			fields: [
				"name",
				"rating",
				"formatted_phone_number",
				"reviews",
				"photos",
				"opening_hours",
				"website",
				"price_level",
				"user_ratings_total"
			]
		};

		const callback = (place, status) => {
			if (status === window.google.maps.places.PlacesServiceStatus.OK) {
				restaurant.reviews = place.reviews;
				restaurant.photos = place.photos;
				restaurant.phone = place.formatted_phone_number;
				restaurant.website = place.website;
				restaurant.user_ratings_total = place.user_ratings_total;
				{
					place.opening_hours
						? (restaurant.isOpen = place.opening_hours.open_now)
						: (restaurant.isOpen = null);
				}
				{
					place.opening_hours
						? (restaurant.weekday_text = place.opening_hours.weekday_text)
						: (restaurant.weekday_text = null);
				}
				this.props.handleClick(this.props.restaurant);
			} else {
				console.log(`Error: ${status}`);
			}
		};
		const divElmt = document.createElement("div");
		const service = new window.google.maps.places.PlacesService(divElmt);
		service.getDetails(request, callback);
	}

	handleMouseOver(restaurant) {
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
