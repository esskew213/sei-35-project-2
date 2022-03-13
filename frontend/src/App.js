import './App.css';
import axios from 'axios';
import Typography from '@mui/material/Typography';
import React, { useEffect, useState } from 'react';
import Form from './components/Form';
function App() {
	const [ displayed, setDisplayed ] = useState('');
	const updateDisplay = () => {
		const makeAPICall = async () => {
			const response = await axios.get('http://127.0.0.1:8000/get_items');
			console.log(response.data);
			setDisplayed(response.data.message);
		};
		makeAPICall();
	};
	useEffect(updateDisplay, []);

	const handleFormSubmit = async (texture, colour, type) => {
		axios({
			method: 'post',
			url: 'http://127.0.0.1:8000/post_item',
			data: {
				texture,
				colour,
				type
			}
		});
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
