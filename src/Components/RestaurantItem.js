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
		this.newAverageRating = Number;
		/* this.rating = Math.floor(restaurant.averageRating); */
		/* this.authorsRatings = []; */
		/* this.averageRating = this.getAverageRating(); */
	}

	static incrementId() {
		latestId++;
		return latestId;
	}

	getAverageRating = () => {
		let lastReview = this.reviews.length - 1;
		let firstReview = this.reviews.length[0];
		console.log(firstReview, lastReview);
		let result =
			(this.averageRating * this.user_ratings_total + lastReview.rating) /
			(this.user_ratings_total + 1);
		return result;
	};

	/* getAverageRating() {
		return (
			(this.rating * this.user_ratings_total + this.authorsRatings[0]) /
			(this.user_ratings_total + 1)
		);
		rating(average) * user_ratings_total + new note  / user_ratings_total + 1
	} */
}
