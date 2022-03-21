import React, { useState } from 'react';
import useInputState from '../hooks/setInputState';
import {
	TextField,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	Button,
	InputAdornment,
	IconButton,
	Box
} from '@mui/material';

import TableDatePicker from './TableDatePicker';
import { useContext } from 'react';
import axios from 'axios';
import applyCaseMiddleware from 'axios-case-converter';
import { SubscriptionsContext } from '../context/Subscriptions.context';
const NewSubscriptionForm = ({ handleCloseModal = null, subscription = null }) => {
	const { getSubscriptions } = useContext(SubscriptionsContext);

	// using a custom hook for all input fields EXCEPT date, which uses react date picker
	const [ name, handleNameChange, resetName ] = useInputState(subscription ? subscription.name : '');
	const [ price, handlePriceChange, resetPrice ] = useInputState(subscription ? subscription.priceInDollars : '');
	const [ recurs, handleRecursChange, resetRecurs ] = useInputState(subscription ? subscription.recurs : '');
	const [ startDate, setStartDate ] = useState(new Date());
	const handleStartDateChange = (date) => {
		setStartDate(date);
	};

	const handleSubmit = async (evt) => {
		evt.preventDefault();
		const dateStarted = startDate.toISOString().split('T')[0];
		console.log(dateStarted);
		const priceInDollars = parseFloat(price).toFixed(2);
		const newSubscription = { dateStarted, name, priceInDollars, recurs };

		// using middleware to convert from camel case in javascript to snake case in python
		const client = applyCaseMiddleware(axios.create());
		if (subscription) {
			newSubscription.id = subscription.id;
			console.log(newSubscription);
			await client.post('http://127.0.0.1:8000/edit_subscription', newSubscription, {
				headers: { authorization: localStorage.token }
			});
		} else {
			// sending in as a list in case there is more than one subscription
			await client.post(
				'http://127.0.0.1:8000/add_subscriptions',
				{ subscriptions: [ newSubscription ] },
				{
					headers: { authorization: localStorage.token }
				}
			);
		}
		await getSubscriptions();

		setStartDate(new Date());
		resetPrice();
		resetName();
		resetRecurs();
		if (handleCloseModal) {
			handleCloseModal();
		}
	};
	return (
		<form onSubmit={handleSubmit}>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'row',
					alignItems: 'baseline',
					justifyContent: 'space-between',
					flexWrap: 'wrap',
					maxWidth: '830px'
				}}
			>
				<FormControl variant="standard" margin="dense" required sx={{ minWidth: '200px', mx: '15px' }}>
					<TextField
						variant="standard"
						size="small"
						label="Subscription name"
						type="text"
						value={name}
						onChange={handleNameChange}
						required
					/>
				</FormControl>
				<FormControl variant="standard" margin="dense" required sx={{ width: '120px', mx: '15px' }}>
					<TextField
						variant="standard"
						size="small"
						id="price"
						label="Price"
						type="number"
						value={price}
						onChange={handlePriceChange}
						min="0"
						required
						step="0.01"
						InputProps={{
							startAdornment: <InputAdornment position="start">$</InputAdornment>,
							inputProps: { min: 0, step: 0.01 }
						}}
					/>
				</FormControl>
				<FormControl variant="standard" margin="dense" required sx={{ minWidth: '100px', mx: '15px' }}>
					<InputLabel htmlFor="recurs">Recurs</InputLabel>
					<Select id="recurs" margin="dense" value={recurs} onChange={handleRecursChange} label="Recurs">
						<MenuItem value="NEVER">
							<em>Never</em>
						</MenuItem>
						<MenuItem value={'WEEKLY'}>Weekly</MenuItem>
						<MenuItem value={'MONTHLY'}>Monthly</MenuItem>
						<MenuItem value={'YEARLY'}>Yearly</MenuItem>
					</Select>
				</FormControl>
				<FormControl variant="standard" margin="dense" required sx={{ minWidth: '100px', mx: '20px' }}>
					<TableDatePicker id="start-date" date={startDate} onInputChange={handleStartDateChange} />
				</FormControl>

				<Button type="submit" variant="contained" sx={{ mx: '15px' }}>
					SUBMIT
				</Button>
			</Box>
		</form>
	);
};

export default NewSubscriptionForm;
