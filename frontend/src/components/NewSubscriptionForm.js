import React from 'react';
import useInputState from '../hooks/setInputState';
import { TextField, FormControl, InputLabel, Select, MenuItem, Button } from '@mui/material';
import axios from 'axios';
import applyCaseMiddleware from 'axios-case-converter';
const NewSubscriptionForm = ({ handleSubscriptionsUpdate }) => {
	const [ startDate, handleStartDateChange, resetStartDate ] = useInputState('');
	const [ name, handleNameChange, resetName ] = useInputState('');
	const [ price, handlePriceChange, resetPrice ] = useInputState('');
	const [ recurs, handleRecursChange, resetRecurs ] = useInputState('');

	const handleSubmit = async (evt) => {
		evt.preventDefault();
		console.log('SUBMITTED!');
		const priceInDollars = parseFloat(parseFloat(price).toFixed(2));
		const newSubscription = { startDate, name, priceInDollars, recurs };
		// using middleware to convert from camel case in javascript to snake case in python
		const client = applyCaseMiddleware(axios.create());
		await client.post('http://127.0.0.1:8000/add_subscription', newSubscription, {
			headers: { authorization: localStorage.token }
		});
		const response = await client.get('http://127.0.0.1:8000/get_subscriptions', {
			headers: { authorization: localStorage.token }
		});
		console.log(response.data.subscriptions);
		handleSubscriptionsUpdate(response.data.subscriptions);
		resetStartDate();
		resetPrice();
		resetName();
		resetRecurs();
	};
	return (
		<form>
			<TextField label="Subscription name" value={name} onChange={handleNameChange} required />
			<TextField label="Price" value={price} onChange={handlePriceChange} />
			{/* TODO change to react date picker */}
			<TextField label="Start date" value={startDate} onChange={handleStartDateChange} required />
			<FormControl variant="standard" sx={{ m: 1, minWidth: 120 }} required>
				<InputLabel>Recurs</InputLabel>
				<Select value={recurs} onChange={handleRecursChange} label="Recurs">
					<MenuItem value="NEVER">
						<em>Never</em>
					</MenuItem>
					<MenuItem value={'WEEKLY'}>Weekly</MenuItem>
					<MenuItem value={'MONTHLY'}>Monthly</MenuItem>
					<MenuItem value={'YEARLY'}>Yearly</MenuItem>
				</Select>
			</FormControl>

			<Button onClick={handleSubmit} variant="contained">
				Add subscription
			</Button>
		</form>
	);
};

export default NewSubscriptionForm;
