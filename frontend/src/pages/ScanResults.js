import React, { useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import DraftNewSub from '../components/DraftNewSub';
import axios from 'axios';
import applyCaseMiddleware from 'axios-case-converter';

const ScanResults = () => {
	const [ isScanning, setIsScanning ] = useState(true);
	const [ draftNewSubs, setDraftNewSubs ] = useState([]);

	useEffect(() => {
		if (isScanning) {
			const getNewSubscriptions = async () => {
				console.log('gmail api is being called');
				const client = applyCaseMiddleware(axios.create());
				const response = await client.get('http://127.0.0.1:8000/fetch_new_subscriptions', {
					headers: { authorization: localStorage.token }
				});
				const tentativeNewSubscriptions = response.data.subscriptions;
				setDraftNewSubs(tentativeNewSubscriptions);
			};
			getNewSubscriptions();
			setIsScanning(false);
		}
	}, []);

	const handleDelete = (idxToDel) => {
		console.log('deleting ', idxToDel);
		setDraftNewSubs((draftNewSubs) => draftNewSubs.filter((sub, idx) => idx !== idxToDel));
	};
	const newSubscriptionList = draftNewSubs.map((sub, index) => {
		console.log('adding', index, sub);
		return (
			<DraftNewSub
				key={index}
				idx={index}
				newName={sub.name}
				newDateStarted={sub.dateStarted}
				newPriceInDollars={sub.priceInDollars}
				newRecurs={sub.recurs}
				handleDelete={handleDelete}
			/>
		);
	});
	return (
		<React.Fragment>
			<Typography variant="h4"> NEW SUBSCRIPTIONS</Typography>
			{newSubscriptionList}
		</React.Fragment>
	);
};

export default ScanResults;
