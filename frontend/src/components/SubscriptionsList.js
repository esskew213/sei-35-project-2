import React from 'react';

import { Typography } from '@mui/material';
const SubscriptionsList = ({ subscriptions }) => {
	return (
		<React.Fragment>
			{subscriptions.map((subscription, idx) => {
				return (
					<Typography key={idx} variant="body2">
						{subscription.name} | Started on {subscription.startDate} | Costs ${subscription.priceInDollars}{' '}
						| Recurs {subscription.recurs}
					</Typography>
				);
			})}
		</React.Fragment>
	);
};

export default SubscriptionsList;
