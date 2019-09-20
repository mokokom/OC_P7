let latestId = 0;

export default class RestaurantItem {
	constructor(restaurant) {
		this.id = `restaurant_${RestaurantItem.incrementId()}`;
		this.name = restaurant.restaurantName;
		this.description = restaurant.description;
		this.address = restaurant.address;
		this.lat = restaurant.lat;
		this.long = restaurant.long;
		this.ratings = restaurant.ratings;
		this.averageRating = restaurant.ratings;
		this.place_id = restaurant.place_id;
		/* this.averageRating = this.calculaverageRating(); */
	}

	static incrementId() {
		latestId++;
		return latestId;
	}

	/* 	calculaverageRating() {
		let ratingsStars = 0;
		if (this.ratings.length >= 1) {
			for (let rating of this.ratings) {
				ratingsStars += rating.stars;
			}
			let averageRating = Math.floor(ratingsStars / this.ratings.length);
			return averageRating;
		}
	} */
}
