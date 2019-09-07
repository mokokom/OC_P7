import React, { Component } from "react";
import "./RestaurantsList.css";
import "bootstrap/dist/css/bootstrap.css";
import Restaurant from "./Restaurant.js";
import StarRatingComponent from "react-star-rating-component";
import TargetedRestaurant from "./TargetedRestaurant.js";

export default class RestaurantsList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			minRating: 1,
			maxRating: 5
		};
		this.onStarClick = this.onStarClick.bind(this);
	}

	onStarClick(nextValue, prevValue, name) {
		if (name === "minRating") {
			this.setState({ minRating: nextValue });
		} else if (name === "maxRating") {
			this.setState({ maxRating: nextValue });
		}
	}

	handleClick = () => {
		console.log(this.props);
		this.props.closeRestaurantTargetView();
	};

	render() {
		const { minRating, maxRating } = this.state;
		return (
			<div className="restaurants-list-container col-12 col-lg-4 p-2 order-2 order-lg-1">
				{this.props.restaurantsListView && (
					<div className="card text-white bg-primary mb-3">
						<div className="card-header">
							<div className="hero-container">
								<h1 className="logo">Restaurants reviews</h1>
							</div>
						</div>
						<div className="card-body">
							<h5 className="card-title">Primary card title</h5>
							<div className="rate-filter d-flex justify-content-around">
								<div className="search-area">
									<h4>minimum rate </h4>
									<div>
										<StarRatingComponent
											name="minRating"
											starCount={5}
											value={minRating}
											onStarClick={this.onStarClick}
										/>
									</div>
								</div>
								<div className="search-area">
									<h4>maximum rate </h4>
									<div>
										<StarRatingComponent
											name="maxRating"
											starCount={5}
											value={maxRating}
											onStarClick={this.onStarClick}
										/>
									</div>
								</div>
							</div>
						</div>
					</div>
				)}
				{!this.props.restaurantsListView && (
					<button onClick={() => this.handleClick()}>close</button>
				)}
				{this.props.restaurantsListView ? (
					this.props.restaurants
						.filter(
							restaurant =>
								restaurant.averageRating >= this.state.minRating &&
								restaurant.averageRating <= this.state.maxRating
						)
						.map(restaurant => (
							<Restaurant
								key={restaurant.name}
								restaurant={restaurant}
								handleClick={this.props.handleClick}
							/>
						))
				) : (
					<TargetedRestaurant
						key={this.props.restaurant.name}
						restaurant={this.props.restaurant}
					/>
				)}
			</div>
		);
	}
}
