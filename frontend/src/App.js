import './App.css';
import applyCaseMiddleware from 'axios-case-converter';
import axios from 'axios';
import Typography from '@mui/material/Typography';
import React, { useEffect, useState } from 'react';
import Form from './components/Form';

const client = applyCaseMiddleware(axios.create());

function App() {
	const [ displayed, setDisplayed ] = useState('');
	const updateDisplay = () => {
		const makeAPICall = async () => {
			const response = await client.get('http://127.0.0.1:8000/get_subscriptions');
			console.log(response.data);
			setDisplayed(response.data.message);
		};
		makeAPICall();
	};
	useEffect(updateDisplay, []);

	const handleFormSubmit = async (name, startDate, renewalDate, recurrence, price) => {
		console.log(name, startDate, renewalDate, recurrence, price);
		const data = {
			name,
			startDate,
			renewalDate,
			recurrence,
			price
		};
		await client.post('http://127.0.0.1:8000/post_subscription', data);
		updateDisplay();
	};
	return (
		<div className="App">
			<Form handleFormSubmit={handleFormSubmit} />
			<Typography variant="h5">{displayed}</Typography>
		</div>
	);
}

export default App;
