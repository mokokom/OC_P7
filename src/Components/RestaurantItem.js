export default class RestaurantItem {
	constructor(restaurant) {
		this.name = restaurant.restaurantName;
		this.description = restaurant.description;
		this.address = restaurant.address;
		this.address = restaurant.address;
		this.lat = restaurant.lat;
		this.long = restaurant.long;
		this.ratings = restaurant.ratings;
		this.averageRating = this.calculaverageRating();
	}

	calculaverageRating() {
		let ratingsStars = 0;
		for (let rating of this.ratings) {
			ratingsStars += rating.stars;
		}
		let averageRating = Math.floor(ratingsStars / this.ratings.length);
		return averageRating;
	}
}
