import React, { Component } from "react";
import StarRatingComponent from "react-star-rating-component";
import "./TargetedRestaurant.css";

export default class TargetedRestaurant extends Component {
	constructor(props) {
		super(props);
		this.state = {
			/* rating: 0, */
			rating: this.props.restaurant.averageRating,
			newRating: 0,
			isClicked: false
		};
	}

	/* componentDidMount() {
		let averageRate = this.props.restaurant.averageRating;
		this.setState({ rating: averageRate });
	} */

	handleClick = restaurant => {
		this.props.closeRestaurantTargetView();
		let targetedMarker = document.querySelector(".targeted-marker");
		if (targetedMarker) {
			targetedMarker.className = "marker hvr-grow";
		}
		let selectedRestaurant = document.getElementById(restaurant);
		selectedRestaurant.classList.add("targeted-marker");
	};

	onStarClick = (nextValue, prevValue, name) => {
		this.setState({ newRating: nextValue });
	};

	handleSubmit = e => {
		e.preventDefault();
		let newStars = parseInt(e.target.elements.rating.value);
		newStars = newStars ? newStars : 0;
		const newComment = {
			stars: newStars,
			comment: e.target.elements.newComment.value
		};
		this.props.handleSubmitFormComment(this.props.restaurant, newComment);
		this.setState({ rating: this.props.restaurant.averageRating });
		let getForm = document.getElementsByName("add-comment-form");
		getForm[0].reset();
	};

	handleBtnIcon() {
		this.setState(prevState => {
			return {
				isClicked: !prevState.isClicked
			};
		});
	}

	render() {
		console.log(this.props.restaurant);
		const { rating } = this.state;
		/* let restaurantPhotos = this.props.restaurant.photos; */
		return (
			<div className="card ">
				{/* <Form handleSubmitForm={this.props.handleSubmitForm} /> */}
				<div className="img-container">
					{/* <img
						className="card-img-top"
						src={`https://maps.googleapis.com/maps/api/streetview?size=200x200&location=${this.props.restaurant.address}&fov=50&heading=235&pitch=0&key=AIzaSyCLYVIY0XkB_QofM2PhdfuojhlLESBGioo`}
						alt="restaurant view"
					/> */}

					{this.props.restaurant.photos &&
					this.props.restaurant.photos.length > 0 ? (
						<div
							id="carouselExampleIndicators"
							className="carousel slide"
							data-ride="carousel"
						>
							<ol className="carousel-indicators">
								{this.props.restaurant.photos.map((photo, index) => {
									return (
										<li
											data-target="#carouselExampleIndicators"
											data-slide-to={index}
											className={index === 0 ? "active" : ""}
										></li>
									);
								})}
							</ol>
							<div className="carousel-inner">
								{this.props.restaurant.photos.map((photo, index) => {
									return (
										<div
											className={
												index === 0 ? "carousel-item active" : "carousel-item"
											}
										>
											<img
												className="d-block w-100"
												src={photo.getUrl({
													maxWidth: 200,
													maxHeight: 200
												})}
												alt="Restaurant image"
											/>
										</div>
									);
								})}
							</div>
							<a
								className="carousel-control-prev"
								href="#carouselExampleIndicators"
								role="button"
								data-slide="prev"
							>
								<span
									className="carousel-control-prev-icon"
									aria-hidden="true"
								></span>
								<span className="sr-only">Previous</span>
							</a>
							<a
								className="carousel-control-next"
								href="#carouselExampleIndicators"
								role="button"
								data-slide="next"
							>
								<span
									className="carousel-control-next-icon"
									aria-hidden="true"
								></span>
								<span className="sr-only">Next</span>
							</a>
						</div>
					) : (
						<img
							className="card-img-top"
							src={`https://maps.googleapis.com/maps/api/streetview?size=200x200&location=${this.props.restaurant.address}&fov=50&heading=235&pitch=0&key=AIzaSyCLYVIY0XkB_QofM2PhdfuojhlLESBGioo`}
							alt="restaurant view"
						/>
					)}

					{!this.props.restaurantsListView && (
						<button
							className="btn-primary rounded btn-image hvr-shrink"
							onClick={() => this.handleClick(this.props.restaurant.id)}
						>
							<i className="d-block fas fa-arrow-left fa-lg"></i>
						</button>
					)}
				</div>
				<div className="card-body">
					<div className="d-flex justify-content-start align-items-center">
						<h3 className="restaurant-name pr-3">
							{this.props.restaurant.name}
						</h3>
						<span>{this.props.restaurant.description}</span>
					</div>
					<div className="no-pointer">
						<StarRatingComponent name="rate1" starCount={5} value={rating} />
					</div>
					{/* <p>
						<em>{this.props.restaurant.description}</em>
					</p> */}
					<address className="restaurant-adress">
						{this.props.restaurant.address}
					</address>
					<h3>Tous les avis</h3>
					<p className="d-flex justify-content-end">
						<i
							onClick={() => this.handleBtnIcon()}
							className={this.state.isClicked ? "fas fa-minus" : "fas fa-plus"}
							title="add comment"
							data-toggle="collapse"
							href="#collapseFormComment"
							role="button"
							aria-expanded="false"
							aria-controls="collapseFormComment"
						></i>
					</p>
					<div className="collapse" id="collapseFormComment">
						<form onSubmit={e => this.handleSubmit(e)} name="add-comment-form">
							<div className="form-group">
								<div className="row">
									<textarea
										className="col-12 mb-2"
										name="newComment"
										id="newComment"
										cols="30"
										rows="5"
										placeholder="Write your comment here"
										required
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
										<button
											className="btn-primary rounded"
											data-toggle="collapse"
											href="#collapseFormComment"
											role="button"
											aria-expanded="false"
											aria-controls="collapseFormComment"
											onClick={() => this.handleBtnIcon()}
										>
											Add
										</button>
									</div>
								</div>
							</div>
						</form>
					</div>
					{this.props.restaurant.reviews &&
						this.props.restaurant.reviews.map(restaurant => {
							/* for (let photo of this.props.restaurant.photos) {
							photo = photo.getUrl({
								maxWidth: 90,
								maxHeight: 90
							});
						} */

							return (
								<div>
									<p>{restaurant.text}</p>
									<p>
										<i className="far fa-star"></i>
										{`${restaurant.rating}/5`}
									</p>
								</div>
							);
						})}
				</div>
			</div>
		);
	}
}
