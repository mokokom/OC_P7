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
					</address>

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
					<div id="accordion">
						<div className="card">
							<div className="card-header" id="headingOne">
								<h5 className="mb-0">
									<button
										className="btn btn-link"
										data-toggle="collapse"
										data-target="#collapseOne"
										aria-expanded="true"
										aria-controls="collapseOne"
									>
										Photos
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
								</div>
							</div>
						</div>
						<div className="card">
							<div className="card-header" id="headingTwo">
								<h5 className="mb-0">
									<button
										className="btn btn-link collapsed"
										data-toggle="collapse"
										data-target="#collapseTwo"
										aria-expanded="false"
										aria-controls="collapseTwo"
									>
										Avis
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
									<h3>Tous les avis</h3> <hr />
									{this.props.restaurant.reviews &&
										this.props.restaurant.reviews.map(review => {
											return (
												<div className="group-review">
													<p>{review.text}</p>
													<p>
														<i>{review.author_name}</i>
													</p>
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
						<div className="card">
							<div className="card-header" id="headingThree">
								<h5 className="mb-0">
									<button
										className="btn btn-link collapsed"
										data-toggle="collapse"
										data-target="#collapseThree"
										aria-expanded="false"
										aria-controls="collapseThree"
									>
										Collapsible Group Item #3
									</button>
								</h5>
							</div>
							<div
								id="collapseThree"
								className="collapse"
								aria-labelledby="headingThree"
								data-parent="#accordion"
							>
								<div className="card-body">
									Anim pariatur cliche reprehenderit, enim eiusmod high life
									accusamus terry richardson ad squid. 3 wolf moon officia aute,
									non cupidatat skateboard dolor brunch. Food truck quinoa
									nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt
									aliqua put a bird on it squid single-origin coffee nulla
									assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft
									beer labore wes anderson cred nesciunt sapiente ea proident.
									Ad vegan excepteur butcher vice lomo. Leggings occaecat craft
									beer farm-to-table, raw denim aesthetic synth nesciunt you
									probably haven't heard of them accusamus labore sustainable
									VHS.
								</div>
							</div>
						</div>
					</div>
					{/* 					{this.props.restaurant.photos &&
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
													maxWidth: 300,
													maxHeight: 500
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
					)} */}

					{/* 					{!this.props.restaurantsListView && (
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
					</div> */}
					{/* this.props.restaurant.reviews &&
						this.props.restaurant.reviews.map(restaurant => {
							return (
								<div>
									<p>{restaurant.text}</p>
									<p>
										<i className="far fa-star"></i>
										{`${restaurant.rating}/5`}
									</p>
								</div>
							);
						}) */}
				</div>
			</div>
		);
	}
}
