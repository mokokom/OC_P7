import React, { Component } from "react";
import Restaurant from "./Restaurant.js";
import StarRatingComponent from "react-star-rating-component";
import TargetedRestaurant from "./TargetedRestaurant.js";
import RestaurantForm from "./RestaurantForm.js";
import SearchRestaurant from "./SearchRestaurant.js";
import "./RestaurantsList.css";

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

	render() {
		const { minRating, maxRating } = this.state;
		return (
			<div className="restaurants-list-container col-12 col-lg-4 p-2 order-2 order-lg-1">
				{this.props.restaurantsListView && (
					<div className="card text-white bg-primary mb-3">
						<div className="card-header">
							<div className="hero-container">
								<h1 className="logo d-flex justify-content-center">
									<i className="fas fa-utensils"></i>
								</h1>
								<RestaurantForm
									handleSubmitForm={this.props.handleSubmitForm}
									newRestaurantPosition={this.props.newRestaurantPosition}
								/>
							</div>
						</div>
						<div className="card-body">
							<h5 className="card-title text-center">
								Filter by <i className="far fa-star"></i>
							</h5>
							<div className="rate-filter d-flex justify-content-around">
								<div className="search-area d-flex flex-column justify-content-center align-items-center">
									<h4>
										<i className="fas fa-sort-amount-down"></i>
									</h4>
									<div>
										<StarRatingComponent
											name="minRating"
											starCount={5}
											value={minRating}
											onStarClick={this.onStarClick}
										/>
									</div>
								</div>
								<div className="search-area search-area d-flex flex-column justify-content-center align-items-center">
									<h4>
										<i className="fas fa-sort-amount-up"></i>
									</h4>
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
						<div className="card-footer bg-transparent ">
							<SearchRestaurant
								handleSubmitForm={this.props.handleSubmitForm}
								newRestaurantPosition={this.props.newRestaurantPosition}
							/>
						</div>
					</div>
				)}
				{this.props.restaurantsListView ? (
					this.props.restaurants
						.filter(
							restaurant =>
								restaurant.rating >= this.state.minRating &&
								restaurant.rating <= this.state.maxRating
							/* restaurant.averageRating >= this.state.minRating &&
								restaurant.averageRating <= this.state.maxRating */
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
						handleClick={this.props.handleClick}
						restaurantsListView={this.props.restaurantsListView}
						closeRestaurantTargetView={this.props.closeRestaurantTargetView}
						handleSubmitFormComment={this.props.handleSubmitFormComment}
						handleSubmitForm={this.props.handleSubmitForm}
					/>
				)}
			</div>
		);
	}
}
