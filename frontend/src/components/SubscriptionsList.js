import React, { useState, useContext, useEffect } from 'react';
import SubscriptionItem from './SubscriptionItem';
import { Grid, Box, Button } from '@mui/material';
import { SubscriptionsContext } from '../context/Subscriptions.context';
import { sortByBillingDate, sortByName, sortByPrice, sortByDateStarted } from '../utils/sortFunctions';
import { Rectangle } from '@mui/icons-material';
const SubscriptionsList = () => {
	const { subscriptions, getSubscriptions } = useContext(SubscriptionsContext);
	const [ displayedSubs, setDisplayedSubs ] = useState('');
	console.log(displayedSubs);
	useEffect(() => {
		getSubscriptions();
	}, []);

	useEffect(
		() => {
			if (subscriptions) {
				const subscriptions_copy = JSON.parse(JSON.stringify(subscriptions));
				setDisplayedSubs(subscriptions_copy);
			}
		},
		[ subscriptions ]
	);
	const toDisplay = displayedSubs ? displayedSubs : subscriptions;
	// console.log(typeof subscriptions[0].nextBillingDate);
	const handleSortByBillingDate = () => {
		setDisplayedSubs((prevState) => sortByBillingDate(JSON.parse(JSON.stringify(prevState))));
	};
	return (
		<React.Fragment>
			<Button onClick={handleSortByBillingDate}>SORT</Button>
			<Grid container spacing={2} direction="column" justifyContent="flex-start" alignItems="center">
				{toDisplay.map((subscription, idx) => (
					<Grid item xl={6} lg={6} md={8} sm={8} xs={12} key={idx}>
						<SubscriptionItem subscription={subscription} />
					</Grid>
				))}
			</Grid>
		</React.Fragment>
	);
};

export default SubscriptionsList;
