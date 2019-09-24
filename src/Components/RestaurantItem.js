let latestId = 0;

export default class RestaurantItem {
	constructor(restaurant) {
		this.id = `restaurant_${RestaurantItem.incrementId()}`;
		this.name = restaurant.restaurantName;
		this.description = restaurant.description;
		this.address = restaurant.address;
		this.lat = restaurant.lat;
		this.long = restaurant.long;
		this.rating = Math.floor(restaurant.rating);
		this.averageRating = Math.floor(restaurant.rating);
		this.place_id = restaurant.place_id;
		/* this.authorsRatings = []; */
		/* this.averageRating = this.getAverageRating(); */
	}

	static incrementId() {
		latestId++;
		return latestId;
	}

	getAverageRating(newRating) {
		return (
			(this.rating * this.user_ratings_total + newRating) /
			(this.user_ratings_total + 1)
		);
		/* rating(average) * user_ratings_total + new note  / user_ratings_total + 1 */
	}
}
