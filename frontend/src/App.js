import './App.css';
import axios from 'axios';
import Typography from '@mui/material/Typography';
import React, { useEffect, useState } from 'react';

function App() {
	const [ displayed, setDisplayed ] = useState('');
	useEffect(
		() => {
			const makeAPICall = async () => {
				const response = await axios.get('http://127.0.0.1:8000');
				console.log(response.data);
				setDisplayed(response.data.message);
			};
			makeAPICall();
		},
		[ displayed ]
	);
	return (
		<div className="App">
			<Typography variant="h1">{displayed}</Typography>
		</div>
	);
}

export default App;
