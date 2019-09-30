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
		this.averageRating = restaurant.averageRating;
		this.user_ratings_total = restaurant.user_ratings_total;
		this.reviews = [
			{
				author_name: null,
				text: null,
				rating: null
			}
		];
		this.newRatingsToAdd = [];
		this.newAverageRating = this.getAverageRating();
		this.isOpen = null;
	}

	static incrementId() {
		latestId++;
		return latestId;
	}

	getAverageRating = () => {
		if (this.place_id === undefined) {
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
			if (this.newRatingsToAdd.length === 0) {
				return this.averageRating;
			} else {
				let total = 0;
				this.newRatingsToAdd.map(rating => {
					total += rating;
				});
				let result =
					(this.averageRating * this.user_ratings_total + total) /
					(this.user_ratings_total + this.newRatingsToAdd.length);
				this.averageRating = Math.round(result);
				return result;
			}
		}
	};
}
