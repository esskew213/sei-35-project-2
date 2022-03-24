import React, { useEffect, useState } from 'react';
import { Grid, Typography, Button, Box } from '@mui/material';
import DraftNewSub from '../components/DraftNewSub';
import axios from 'axios';
import applyCaseMiddleware from 'axios-case-converter';
import { useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';

const ScanResults = () => {
	const [ isScanning, setIsScanning ] = useState(true);
	const [ lastSyncedDate, setLastSyncedDate ] = useState('');
	const [ draftNewSubs, setDraftNewSubs ] = useState([]);
	const [ messageHtml, setMessageHtml ] = useState('');
	const [ thereAreNewSubscriptions, setThereAreNewSubscriptions ] = useState(true);

	const navigate = useNavigate();

	useEffect(() => {
		const getNewSubscriptions = async () => {
			const client = applyCaseMiddleware(axios.create());
			const response = await client.get('http://127.0.0.1:8000/fetch_new_subscriptions', {
				headers: { authorization: localStorage.token }
			});
			if (response.data.scanList[0].name === 'no new subscriptions') {
				setThereAreNewSubscriptions(false);
			} else {
				setMessageHtml(response.data.scanList[0].messageHtml);
				const tentativeNewSubscriptions = response.data.scanList;
				setDraftNewSubs(tentativeNewSubscriptions);
			}
		};
		const getLastSynced = async () => {
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
	}, []);

	const handleDelete = (idxToDel) => {
		console.log('deleting ', idxToDel);
		setDraftNewSubs((draftNewSubs) => draftNewSubs.filter((sub, idx) => idx !== idxToDel));
	};

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
					height: '200px',
					boxSizing: 'border-box',
					padding: '30px'
				}}
			>
				<Box sx={{ mb: '5vh' }}>
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
					sx={{ mb: '5vh' }}
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
					minHeight: 'calc(100vh - 200px)',
					height: '100%',
					paddingBottom: '5vh'
				}}
			>
				{isScanning ? (
					<Loader />
				) : thereAreNewSubscriptions ? (
					<Grid container spacing={2} direction="column" justifyContent="flex-start" alignItems="center">
						{draftNewSubs.map((sub, index) => {
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
						})}
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
