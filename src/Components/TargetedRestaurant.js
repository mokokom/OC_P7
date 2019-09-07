import React, { Component } from "react";

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
		/* this.calculateAverageNote(); */
	}

	render() {
		return <div></div>;
	}
}
