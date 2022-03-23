export const sortByBillingDate = (arr) => {
	return arr.sort((a, b) => new Date(b.nextBillingDate) - new Date(a.nextBillingDate));
};

export const sortByDateStarted = (arr) => {
	return arr.sort((a, b) => new Date(b.dateStarted) - new Date(a.dateStarted));
};

export const sortByName = (arr) => {
	return arr.sort();
};

export const sortByPrice = (arr) => {
	return arr.sort((a, b) => b.priceInDollars - a.priceInDollars);
};
