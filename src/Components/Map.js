import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./Map.css";
import GoogleMapReact from "google-map-react";
import CurrentPlace from "./CurrentPlace.js";
import Marker from "./Marker.js";

export default class Map extends Component {
	constructor(props) {
		super(props);
		this.state = {
			location: {
				lat: 48.886202,
				lng: 2.361252
			}
		};
	}

	componentDidMount() {
		this.getLocation();
	}

	getLocation() {
		if (navigator.geolocation) {
			const that = this;
			navigator.geolocation.getCurrentPosition(position => {
				const center = {
					lat: position.coords.latitude,
					lng: position.coords.longitude
				};
				that.setState({ location: center });
			});
		} else {
			alert("Geolocation is not supported by this browser.");
		}
	}

	render() {
		return (
			<div className="map col-8">
				<GoogleMapReact
					bootstrapURLKeys={{
						key: "AIzaSyCLYVIY0XkB_QofM2PhdfuojhlLESBGioo"
					}}
					center={this.state.location}
					zoom={13}
				>
					{this.props.restaurants.map(restaurant => (
						<Marker
							key={restaurant.name}
							lat={restaurant.lat}
							lng={restaurant.long}
							restaurant={restaurant}
							handleClick={this.handleClick}
						/>
					))}
					<CurrentPlace
						lat={this.state.location.lat}
						lng={this.state.location.lng}
					/>
				</GoogleMapReact>
			</div>
		);
	}
}
