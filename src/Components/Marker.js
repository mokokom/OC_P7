import React, { Component } from "react";
import "./Marker.css";

export default class Marker extends Component {
	constructor(props) {
		super(props);
		this.state = {
			activeMarker: "marker"
		};
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick(e, restaurant) {
		let targetedMarker = document.querySelector(".targeted-marker");
		if (targetedMarker) {
			targetedMarker.className = "marker hvr-grow";
		}
		let element = e.target;
		element.classList.toggle("targeted-marker");
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

				place.opening_hours
					? (restaurant.isOpen = place.opening_hours.open_now)
					: (restaurant.isOpen = null);

				place.opening_hours
					? (restaurant.weekday_text = place.opening_hours.weekday_text)
					: (restaurant.weekday_text = null);

				this.props.handleClick(this.props.restaurant);
			} else {
				console.log(`Error: ${status}`);
			}
		};
		const divElmt = document.createElement("div");
		const service = new window.google.maps.places.PlacesService(divElmt);
		service.getDetails(request, callback);
	}

	render() {
		return (
			<div
				className="marker hvr-grow"
				id={this.props.restaurant.id}
				onClick={e => this.handleClick(e, this.props.restaurant)}
				title={this.props.restaurant.name}
			></div>
		);
	}
}
