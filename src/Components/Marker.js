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

	handleClick(e) {
		this.props.handleClick(this.props.restaurant);
		let targetedMarker = document.querySelector(".targeted-marker");
		if (targetedMarker) {
			targetedMarker.className = "marker";
		}
		let element = e.target;
		console.log(element);
		element.classList.toggle("targeted-marker");
	}

	render() {
		return (
			<div
				className="marker"
				id={this.props.restaurant.name}
				onClick={e => this.handleClick(e)}
			/>
		);
	}
}
