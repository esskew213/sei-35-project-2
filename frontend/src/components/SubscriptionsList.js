import React, { useState, useContext, useEffect } from 'react';
import SubscriptionItem from './SubscriptionItem';
import { Grid, Box, Button, Typography } from '@mui/material';
import { SubscriptionsContext } from '../context/Subscriptions.context';
import { sortByBillingDate, sortByName, sortByPrice, sortByDateStarted } from '../utils/sortFunctions';
import SortIcon from '@mui/icons-material/Sort';
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
				console.log(subscriptions);
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
			{toDisplay.length > 0 ? (
				<Box sx={{ width: '60vw', maxWidth: '500px' }}>
					<Grid container rowSpacing={2} direction="column" justifyContent="flex-start" alignItems="center">
						<Grid item sx={{ alignSelf: 'flex-end' }}>
							<Button
								color="secondary"
								variant="outlined"
								size="small"
								margin="dense"
								onClick={handleSortByBillingDate}
								endIcon={<SortIcon />}
							>
								SORT
							</Button>
						</Grid>
						{toDisplay.map((subscription, idx) => (
							<Grid item xl={8} lg={8} md={8} sm={8} xs={12} key={idx}>
								<SubscriptionItem subscription={subscription} />
							</Grid>
						))}
					</Grid>
				</Box>
			) : (
				<Box sx={{ textAlign: 'center', p: '30px' }}>
					<Typography variant="h5">No subscriptions found.</Typography>
				</Box>
			)}
		</React.Fragment>
	);
};

export default SubscriptionsList;
