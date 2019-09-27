let latestId = 0;

export default class RestaurantItem {
	constructor(restaurant) {
		this.id = `restaurant_${RestaurantItem.incrementId()}`;
		this.place_id = restaurant.place_id;
		this.name = restaurant.restaurantName;
		this.description = restaurant.description;
		this.address = restaurant.address;
		this.lat = restaurant.lat;
		this.long = restaurant.long;
		this.averageRating = Math.floor(restaurant.averageRating);
		this.user_ratings_total = restaurant.user_ratings_total;
		this.reviews = [
			{
				author_name: null,
				text: null,
				rating: null
			}
		];
		this.newAverageRating = this.getAverageRating();
		this.isOpen = null;
		/* this.rating = Math.floor(restaurant.averageRating); */
		/* this.authorsRatings = []; */
		/* this.averageRating = this.getAverageRating(); */
	}

	static incrementId() {
		latestId++;
		return latestId;
	}

	getAverageRating = () => {
		/* console.log(placeId); */
		console.log(this, this.place_id);
		let lastReview = this.reviews[this.reviews.length - 1];
		let firstReview = this.reviews[0];
		/* console.log(firstReview, lastReview); */

		if (this.place_id == undefined) {
			console.log("code for my rest");

			if (this.reviews.length <= 1) {
				return this.averageRating;
			} else {
				let total = 0;
				this.reviews.map(review => {
					total += review.rating;
				});
				let result = total / this.user_ratings_total;
				return result;
			}
		} else {
			console.log("code for Grestaurant");
			this.newRatingsToAdd = [];
			console.log(this);
			return this.averageRating;
		}

		/* let result =
			(this.averageRating * this.user_ratings_total + lastReview.rating) /
			(this.user_ratings_total + 1);
		return result; */
	};

	/* getAverageRating() {
		return (
			(this.rating * this.user_ratings_total + this.authorsRatings[0]) /
			(this.user_ratings_total + 1)
		);
		rating(average) * user_ratings_total + new note  / user_ratings_total + 1
	} */
}
