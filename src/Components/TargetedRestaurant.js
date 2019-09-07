import React, { Component } from "react";
import StarRatingComponent from "react-star-rating-component";
import "./TargetedRestaurant.css";

export default class TargetedRestaurant extends Component {
	constructor(props) {
		super(props);
		this.state = {
			rating: 1
		};
	}

	componentDidMount() {
		let averageRate = this.props.restaurant.averageRating;
		this.setState({ rating: averageRate });
	}

	render() {
		const { rating } = this.state;
		return (
			<div className="card">
				<img
					className="card-img-top"
					src={`https://maps.googleapis.com/maps/api/streetview?size=200x200&location=${this.props.restaurant.address}&fov=50&heading=235&pitch=0&key=AIzaSyCLYVIY0XkB_QofM2PhdfuojhlLESBGioo`}
					alt="restaurant view"
				/>
				<div className="card-body">
					<h3 className="restaurant-name" onClick={e => this.handleClick(e)}>
						{this.props.restaurant.name}
					</h3>
					<div className="no-pointer">
						<StarRatingComponent name="rate1" starCount={5} value={rating} />
					</div>
					<address className="restaurant-adress">
						{this.props.restaurant.address}
					</address>
					<h3>Tous les avis</h3>
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
