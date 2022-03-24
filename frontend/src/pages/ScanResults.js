import React, { useEffect, useState, useContext } from 'react';
import { Grid, Typography, Button, Box } from '@mui/material';
import DraftNewSub from '../components/DraftNewSub';
import axios from 'axios';
import applyCaseMiddleware from 'axios-case-converter';
import { useNavigate } from 'react-router-dom';
import EmailPopover from '../components/EmailPopover';

const ScanResults = () => {
	const [ isScanning, setIsScanning ] = useState(true);
	const [ lastSyncedDate, setLastSyncedDate ] = useState('');
	const [ draftNewSubs, setDraftNewSubs ] = useState([]);
	const [ messageHtml, setMessageHtml ] = useState('');
	const [ thereAreNewSubscriptions, setThereAreNewSubscriptions ] = useState(true);
	// const { isLoggedIn } = useContext(IsLoggedInContext);
	// console.log('ON SCAN PAGE, LOGGED IN:', isLoggedIn);
	const navigate = useNavigate();
	useEffect(() => {
		if (isScanning) {
			const getNewSubscriptions = async () => {
				console.log('gmail api is being called');
				const client = applyCaseMiddleware(axios.create());
				const response = await client.get('http://127.0.0.1:8000/fetch_new_subscriptions', {
					headers: { authorization: localStorage.token }
				});
				if (response.data.scanList[0].name === 'no new subscriptions') {
					setThereAreNewSubscriptions(false);
				} else {
					console.log(response.data.scanList);
					setMessageHtml(response.data.scanList[0].messageHtml);
					const tentativeNewSubscriptions = response.data.scanList;
					setDraftNewSubs(tentativeNewSubscriptions);
				}
			};
			const getLastSynced = async () => {
				console.log('gmail api is being called');
				const client = applyCaseMiddleware(axios.create());
				const response = await client.get('http://127.0.0.1:8000/get_last_synced_date', {
					headers: { authorization: localStorage.token }
				});
				if (response.data.lastSyncedDate) {
					setLastSyncedDate(response.data.lastSyncedDate);
				}
			};
			getNewSubscriptions();
			getLastSynced();
			setIsScanning(false);
			console.log(messageHtml ? messageHtml : 'no HTML');
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
				messageHtml={sub.messageHtml}
			/>
		);
	});
	return (
		<React.Fragment>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'row',
					justifyContent: 'space-between',
					alignItems: 'flex-end',
					width: '100vw',
					backgroundColor: 'primary.dark',
					// height: '150px',
					boxSizing: 'border-box',
					padding: '30px'
				}}
			>
				<Box>
					<Typography color="white" variant="h4" gutterBottom>
						{' '}
						NEW SUBSCRIPTIONS
					</Typography>
					<Typography color="white" variant="button" component="div">
						Last synced:{' '}
						<Typography variant="h6" component="span" sx={{ ml: '10px', color: 'secondary.main' }}>
							{lastSyncedDate || '-'}
						</Typography>
					</Typography>
				</Box>
				<Button
					variant="contained"
					color="secondary"
					onClick={() => {
						navigate('/home');
					}}
				>
					BACK TO HOME
				</Button>
			</Box>
			<Box
				sx={{
					backgroundColor: 'primary.light',
					backgroundOrigin: 'border-box',
					height: '100vh'
				}}
			>
				{thereAreNewSubscriptions ? (
					<Grid container spacing={2} direction="column" justifyContent="flex-start" alignItems="center">
						{newSubscriptionList}
					</Grid>
				) : (
					<Box sx={{ textAlign: 'center', p: '30px' }}>
						<Typography variant="h5">No new subscriptions found.</Typography>
					</Box>
				)}
			</Box>
		</React.Fragment>
	);
};

export default ScanResults;
