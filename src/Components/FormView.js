import React, { Component } from "react";

export default class FormView extends Component {
	render() {
		return (
			<div>
				<p className="d-flex justify-content-end">
					<i
						className="fas fa-plus"
						title="add restaurant"
						onClick={() => console.log("test")}
						data-toggle="collapse"
						href="#collapseForm"
						role="button"
						aria-expanded="false"
						aria-controls="collapseForm"
					></i>
				</p>
				<div className="collapse" id="collapseForm">
					<form>
						<div class="row">
							<div class="col-12 col-sm-6 mb-2">
								<input
									type="text"
									class="form-control"
									name="name"
									placeholder="Restaurant name"
								/>
							</div>
							<div class="col-12 col-sm-6 mb-2">
								<input
									type="text"
									class="form-control"
									name="description"
									placeholder="Description"
								/>
							</div>
							<div class="col-12 col-sm-6 mb-2">
								<input
									type="text"
									class="form-control"
									name="address"
									placeholder="Address"
								/>
							</div>
							<div class="col-12 col-sm-6 mb-2">
								<input
									type="text"
									class="form-control"
									name="postalCode"
									placeholder="Postal code"
								/>
							</div>
							{/* <div class="col-12 col-sm-6 mb-2">
								<input
									type="text"
									class="form-control"
									name="latitude"
									placeholder="Latitude"
								/>
							</div>
							<div class="col-12 col-sm-6 mb-2">
								<input
									type="text"
									class="form-control"
									name="longitude"
									placeholder="Longitude"
								/>
							</div> */}
							<div className="col-12 text-center">
								<button type="submit" className="btn btn-form rounded">
									Add
								</button>
							</div>
						</div>
					</form>
				</div>
			</div>
		);
	}
}
