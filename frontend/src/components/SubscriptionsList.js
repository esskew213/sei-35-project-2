import React, { useContext, useEffect } from 'react';
import SubscriptionItem from './SubscriptionItem';
import { Grid } from '@mui/material';
import { SubscriptionsContext } from '../context/Subscriptions.context';
const SubscriptionsList = () => {
	const { subscriptions, getSubscriptions } = useContext(SubscriptionsContext);
	useEffect(() => {
		getSubscriptions();
	}, []);
	console.log(subscriptions);
	return (
		<Grid container spacing={2} direction="column" justifyContent="flex-start" alignItems="center">
			{subscriptions.map((subscription, idx) => (
				<Grid item xl={6} lg={6} md={8} sm={8} xs={12} key={idx}>
					<SubscriptionItem subscription={subscription} />
				</Grid>
			))}
		</Grid>
	);
};

export default SubscriptionsList;
