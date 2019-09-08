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

	handleMouseOver() {
		return <p>{this.props.restaurant.name}</p>;
	}

	render() {
		const styleAtt = {
			width: "10rem",
			position: "relative",
			top: "-20px",
			left: "-60px",
			zIndex: "1"
			/* color: "var(--blue)" */
		};
		return (
			<div
				className="marker"
				id={this.props.restaurant.name}
				onClick={e => this.handleClick(e)}
			>
				{
					<div className="test" style={styleAtt} text-center>
						<p>{this.props.restaurant.name}</p>
					</div>
				}
				{/* <div class="test card" style={styleAtt}>
						<div class="card-body">
							<h5 class="card-title">{this.props.restaurant.name}</h5>
							<h6 class="card-subtitle mb-2 text-muted">
								{this.props.restaurant.description}
							</h6>
							<a href="#" class="card-link">
								Card link
							</a>
							<a href="#" class="card-link">
								Another link
							</a>
						</div>
					</div> */}
			</div>
		);
	}
}
