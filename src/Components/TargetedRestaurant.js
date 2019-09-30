import React, { Component } from "react";
import StarRatingComponent from "react-star-rating-component";
import "./TargetedRestaurant.css";

export default class TargetedRestaurant extends Component {
	constructor(props) {
		super(props);
		this.state = {
			rating:
				this.props.restaurant.newAverageRating === 0
					? this.props.restaurant.averageRating
					: this.props.restaurant.newAverageRating,
			newRating: 0,
			isClicked: false
		};
	}

	handleClick = () => {
		this.props.closeRestaurantTargetView();
	};

	onStarClick = (nextValue, prevValue, name) => {
		this.setState({ newRating: nextValue });
	};

	handleSubmit = e => {
		e.preventDefault();
		let newStars = parseInt(e.target.elements.rating.value);
		newStars = newStars ? newStars : 0;
		const newComment = {
			author: e.target.elements.authorComment.value,
			stars: newStars,
			comment: e.target.elements.newComment.value
		};
		if (this.props.restaurant.place_id !== undefined) {
			this.props.restaurant.newRatingsToAdd.push(newStars);
		}
		this.props.handleSubmitFormComment(
			this.props.restaurant,
			newComment,
			newStars
		);
		this.setState({ rating: this.props.restaurant.newAverageRating });
		let getForm = document.getElementsByName("add-comment-form");
		getForm[0].reset();
		document.getElementById("collapseFormComment").classList.add("collapsing");
		document.getElementById("collapseFormComment").classList.remove("show");
	};

	handleBtnIcon() {
		this.setState(prevState => {
			return {
				isClicked: !prevState.isClicked
			};
		});
	}

	render() {
		const { rating } = this.state;
		return (
			<div className="card ">
				<div className="img-container">
					{!this.props.restaurantsListView && (
						<button
							className="btn rounded btn-image hvr-shrink"
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
					<address className="restaurant-adress">
						<p>{this.props.restaurant.address}</p>
						<p>{this.props.restaurant.phone}</p>
						{this.props.restaurant.website && (
							<a
								href={this.props.restaurant.website}
								target="_blank"
								rel="noopener noreferrer"
							>
								website
							</a>
						)}
					</address>
					<div id="accordion">
						<div className="card">
							<div
								className="card-header div-collapse"
								id="headingOne"
								data-toggle="collapse"
								data-target="#collapseOne"
								aria-expanded="false"
								aria-controls="collapseOne"
							>
								<h5 className="mb-0">
									<button className="btn btn-link">
										Photos
										{this.props.restaurant.photos && (
											<small>{` (${this.props.restaurant.photos.length})`}</small>
										)}
									</button>
								</h5>
							</div>

							<div
								id="collapseOne"
								className="collapse show"
								aria-labelledby="headingOne"
								data-parent="#accordion"
							>
								<div className="card-body">
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
															key={index}
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
															key={index}
															className={
																index === 0
																	? "carousel-item active"
																	: "carousel-item"
															}
														>
															<img
																className="d-block w-100"
																src={photo.getUrl({
																	maxWidth: 300,
																	maxHeight: 500
																})}
																alt="Restaurant"
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
											src={`https://maps.googleapis.com/maps/api/streetview?size=200x200&location=${this.props.restaurant.address}&fov=50&heading=235&pitch=0&key=${process.env.REACT_APP_API_KEY}`}
											alt="restaurant view"
										/>
									)}
								</div>
							</div>
						</div>
						<div className="card">
							<div
								className="card-header div-collapse"
								id="headingTwo"
								data-toggle="collapse"
								data-target="#collapseTwo"
								aria-expanded="false"
								aria-controls="collapseTwo"
							>
								<h5 className="mb-0 d-inline">
									<button className="btn btn-link collapsed">
										Reviews
										<small className="d-inline">
											{` (${this.props.restaurant.user_ratings_total} ratings)`}
										</small>
									</button>
								</h5>
							</div>
							<div
								id="collapseTwo"
								className="collapse"
								aria-labelledby="headingTwo"
								data-parent="#accordion"
							>
								<div className="card-body">
									<p className="d-flex justify-content-end">
										<i
											onClick={() => this.handleBtnIcon()}
											className={
												this.state.isClicked ? "fas fa-minus" : "fas fa-plus"
											}
											title="add comment"
											data-toggle="collapse"
											href="#collapseFormComment"
											role="button"
											aria-expanded="true"
											aria-controls="collapseFormComment"
										></i>
									</p>
									<div className="collapse" id="collapseFormComment">
										<form
											onSubmit={e => this.handleSubmit(e)}
											name="add-comment-form"
										>
											<div className="form-group">
												<div className="row">
													<input
														className="col-12 mb-2"
														type="text"
														name="authorComment"
														placeholder="Your name"
													/>

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
															/* data-toggle="collapse"
															href="#collapseFormComment" */
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
									<h3>All reviews</h3>
									<small>
										{Math.floor(this.props.restaurant.newAverageRating) +
											"/5" +
											" - " +
											this.props.restaurant.user_ratings_total +
											" ratings"}
									</small>
									<hr />
									{this.props.restaurant.reviews &&
										this.props.restaurant.reviews.map((review, index) => {
											return (
												<div className="group-review" key={index}>
													<p>
														{review.profile_photo_url && (
															<img
																className="m-2 img-fluid profil"
																src={review.profile_photo_url}
																alt=""
															/>
														)}
														<i>{review.author_name && review.author_name}</i>{" "}
														<br />
														<small>{review.relative_time_description}</small>
													</p>
													<p>{review.text}</p>
													<p>
														<i className="far fa-star"></i>
														{`${review.rating}/5`}
													</p>
												</div>
											);
										})}
								</div>
							</div>
						</div>
						{
							<div className="card">
								<div
									className="card-header div-collapse"
									id="headingThree"
									data-toggle="collapse"
									data-target="#collapseThree"
									aria-expanded="false"
									aria-controls="collapseThree"
								>
									<h5 className="mb-0">
										<button className="btn btn-link collapsed">
											Opening hours
											<small>
												{`${
													this.props.restaurant.isOpen === null
														? ""
														: (this.props.restaurant.isOpen && " (open)") ||
														  (!this.props.restaurant.isOpen && " (closed)")
												}`}
											</small>
										</button>
									</h5>
								</div>
								{
									<div
										id="collapseThree"
										className="collapse"
										aria-labelledby="headingThree"
										data-parent="#accordion"
									>
										<div className="card-body">
											{this.props.restaurant.weekday_text ? (
												<ul>
													{this.props.restaurant.weekday_text.map(
														(day, index) => (
															<li key={index}>{day}</li>
														)
													)}
												</ul>
											) : (
												<p>No opening hours information</p>
											)}
										</div>
									</div>
								}
							</div>
						}
					</div>
				</div>
			</div>
		);
	}
}
