export const sortByBillingDate = (arr) => {
	return arr.sort((a, b) => new Date(b.nextBillingDate) - new Date(a.nextBillingDate));
};

export const sortByDateStarted = (arr) => {
	return arr.sort((a, b) => new Date(b.dateStarted) - new Date(a.dateStarted));
};

export const sortByName = (arr) => {
	return arr.sort((a, b) => {
		const nameA = a.name.toUpperCase();
		const nameB = b.name.toUpperCase();
		if (nameA < nameB) {
			return -1;
		}
		if (nameA > nameB) {
			return 1;
		}

		return 0;
	});
};

export const sortByPrice = (arr) => {
	return arr.sort((a, b) => b.priceInDollars - a.priceInDollars);
};
