import React, { useState } from 'react';
import useInputState from '../hooks/setInputState';
import { TextField, FormControl, InputLabel, Select, MenuItem, Button, InputAdornment } from '@mui/material';
import TableDatePicker from './TableDatePicker';
import axios from 'axios';
import applyCaseMiddleware from 'axios-case-converter';
const NewSubscriptionForm = ({ handleSubscriptionsUpdate }) => {
	// using a custom hook for all input fields EXCEPT date, which uses react date picker
	const [ name, handleNameChange, resetName ] = useInputState('');
	const [ price, handlePriceChange, resetPrice ] = useInputState('');
	const [ recurs, handleRecursChange, resetRecurs ] = useInputState('');
	const [ startDate, setStartDate ] = useState(new Date());
	const handleStartDateChange = (date) => {
		console.log(date);
		setStartDate(date);
	};

	const handleSubmit = async (evt) => {
		evt.preventDefault();
		const dateStarted = startDate.toISOString().split('T')[0];
		console.log(dateStarted);
		const priceInDollars = parseFloat(price).toFixed(2);

		const newSubscription = { dateStarted, name, priceInDollars, recurs };
		console.log(newSubscription);
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
		setStartDate(new Date());
		resetPrice();
		resetName();
		resetRecurs();
	};
	return (
		<form>
			<TextField
				variant="standard"
				size="small"
				label="Subscription name"
				type="text"
				value={name}
				onChange={handleNameChange}
				required
			/>

			<FormControl variant="standard" sx={{ m: 1, minWidth: 120 }} required>
				<TextField
					variant="standard"
					size="small"
					id="price"
					label="Price"
					type="number"
					value={price}
					onChange={handlePriceChange}
					min="0"
					step="0.01"
					InputProps={{
						startAdornment: <InputAdornment position="start">$</InputAdornment>,
						inputProps: { min: 0, step: 0.01 }
					}}
				/>
			</FormControl>

			{/* TODO change to react date picker
			<TextField label="Start date" value={startDate} onChange={handleStartDateChange} required /> */}
			<FormControl variant="standard" sx={{ m: 1, minWidth: 120 }} required>
				<InputLabel htmlFor="recurs">Recurs</InputLabel>
				<Select id="recurs" value={recurs} onChange={handleRecursChange} label="Recurs">
					<MenuItem value="NEVER">
						<em>Never</em>
					</MenuItem>
					<MenuItem value={'WEEKLY'}>Weekly</MenuItem>
					<MenuItem value={'MONTHLY'}>Monthly</MenuItem>
					<MenuItem value={'YEARLY'}>Yearly</MenuItem>
				</Select>
			</FormControl>
			<TableDatePicker date={startDate} onInputChange={handleStartDateChange} />
			<Button onClick={handleSubmit} variant="contained">
				Add subscription
			</Button>
		</form>
	);
};

export default NewSubscriptionForm;
