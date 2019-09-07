import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import StarRatingComponent from "react-star-rating-component";
import RestaurantItem from "./RestaurantItem.js";

export default class Restaurant extends Component {
	constructor(props) {
		super(props);
		this.state = {
			rating: 1
		};
		this.onStarClick = this.onStarClick.bind(this);
	}

	componentDidMount() {
		let averageRate = this.props.restaurant.averageRating;
		this.setState({ rating: averageRate });
		/* this.calculateAverageNote(); */
	}

	/* calculateAverageNote() {
		const ratings = this.props.restaurant.ratings;
		let ratingsStars = 0;
		for (let rating of ratings) {
			ratingsStars += rating.stars;
		}
		let averageRating = Math.floor(ratingsStars / ratings.length);
		this.setState({
			rating: averageRating
		});
    } */
	handleClick(e) {
		this.props.handleClick(this.props.restaurant);
		/* 		let targetedMarker = document.querySelector(".targeted-marker");
		if (targetedMarker) {
			targetedMarker.className = "marker";
		}

		let element = e.target;
		let selectedRestaurant = document.getElementById(element.textContent);
		console.log(selectedRestaurant);
		selectedRestaurant.classList.add("targeted-marker"); */
		/* element.classList.toggle("targeted-marker"); */
	}

	onStarClick(nextValue, prevValue, name) {
		this.setState({ rating: nextValue });
	}

	render() {
		const { rating } = this.state;
		return (
			<div className="card container-fluid mb-3 p-2">
				<div className="row">
					<div className="col-lg-6 col-12 text-center text-lg-right">
						<h3 className="restaurant-name" onClick={e => this.handleClick(e)}>
							{this.props.restaurant.name}
						</h3>
						<div className="no-pointer">
							<StarRatingComponent name="rate1" starCount={5} value={rating} />
						</div>
						<p className="card-title">{this.props.restaurant.description}</p>
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
