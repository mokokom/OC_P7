import React, { Component } from "react";
import StarRatingComponent from "react-star-rating-component";
import "./TargetedRestaurant.css";

export default class TargetedRestaurant extends Component {
	constructor(props) {
		super(props);
		this.state = {
			rating: 0,
			newRating: 0
		};
	}

	componentDidMount() {
		let averageRate = this.props.restaurant.averageRating;
		this.setState({ rating: averageRate });
	}

	handleClick = () => {
		console.log(this.props);
		this.props.closeRestaurantTargetView();
	};

	onStarClick = (nextValue, prevValue, name) => {
		this.setState({ newRating: nextValue });
	};

	handleSubmit = e => {
		e.preventDefault();
		/* console.log(e.target.elements.newComment.value); */
		const newComment = {
			stars: e.target.elements.rating.value,
			comment: e.target.elements.newComment.value
		};
		this.props.handleSubmitFormComment(this.props.restaurant, newComment);
		/* let newRest = this.props.restaurant;
		newRest.ratings.concat(newComment);
		console.log(newRest.ratings);
		console.log(this.props.restaurant.ratings);
		console.log(this.props.handleClick); */
		/* let restupdate = this.props.restaurant.ratings.concat(newComment);
		console.log(restupdate); */
		/* Find how to pass the new comment to the restaurant state */
	};

	render() {
		const { rating } = this.state;
		return (
			<div className="card">
				<div className="img-container">
					{!this.props.restaurantsListView && (
						<button
							className="btn-primary rounded btn-image"
							onClick={() => this.handleClick()}
						>
							<i className="d-block fas fa-arrow-left fa-lg"></i>
						</button>
					)}
					<img
						className="card-img-top"
						src={`https://maps.googleapis.com/maps/api/streetview?size=200x200&location=${this.props.restaurant.address}&fov=50&heading=235&pitch=0&key=AIzaSyCLYVIY0XkB_QofM2PhdfuojhlLESBGioo`}
						alt="restaurant view"
					/>
				</div>
				<div className="card-body">
					<h3 className="restaurant-name">{this.props.restaurant.name}</h3>
					<div className="no-pointer">
						<StarRatingComponent name="rate1" starCount={5} value={rating} />
					</div>
					<address className="restaurant-adress">
						{this.props.restaurant.address}
					</address>
					<h3>Tous les avis</h3>
					<p className="d-flex justify-content-end">
						<i
							className="fas fa-plus"
							title="add comment"
							data-toggle="collapse"
							href="#collapseFormComment"
							role="button"
							aria-expanded="false"
							aria-controls="collapseFormComment"
						></i>
					</p>
					<div className="collapse" id="collapseFormComment">
						<form onSubmit={e => this.handleSubmit(e)}>
							<div className="form-group">
								<div className="row">
									<textarea
										className="col-12 mb-2"
										name="newComment"
										id="newComment"
										cols="30"
										rows="5"
										placeholder="Write your comment here"
									></textarea>
									<div className="col-12 mb-2">
										<div className="d-flex align-items-center">
											<label className="mr-2">Your rating</label>
											<StarRatingComponent
												name="rating"
												starCount={5}
												value={this.state.newRating}
												onStarClick={this.onStarClick}
											/>
										</div>
									</div>
									<div className="col-12 mb-2 text-center">
										<button className="btn-primary rounded">Add</button>
									</div>
								</div>
							</div>
						</form>
						{/* <form>
							<div className="row">
								<textarea
									className="col-12 mb-2"
									name="newComment"
									id="newComment"
									cols="30"
									rows="10"
									placeholder="Write your comment here"
								></textarea>
								<div className="col-12 mb-2">
									<StarRatingComponent
										name="rating"
										starCount={5}
										value={this.state.rating}
										onStarClick={this.onStarClick}
									/>
								</div>
							</div>
						</form> */}
					</div>
					{this.props.restaurant.ratings.map(restaurant => {
						return (
							<div>
								<p>{restaurant.comment}</p> <hr />
							</div>
						);
					})}
				</div>
			</div>
		);
	}
}
