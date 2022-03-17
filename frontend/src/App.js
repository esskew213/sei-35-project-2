import './App.css';
import axios from 'axios';
import Typography from '@mui/material/Typography';
import { Button, Box } from '@mui/material';
import React, { useState } from 'react';

function App() {
	const [ displayed, setDisplayed ] = useState('');

	const makeAPICall = async () => {
		const credsResponse = await axios.get('http://127.0.0.1:8000/get_creds');
		if (credsResponse.data) {
			console.log(credsResponse.data);
			// const subjectsResponse = await axios.get('http://127.0.0.1:8000/message_subjects');
			// console.log(subjectsResponse.data.subjects);
			// setDisplayed(subjectsResponse.data.subjects);
		}
	};

	const handleClick = (evt) => {
		evt.preventDefault();
		makeAPICall();
	};
	return (
		<div className="App">
			<Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center' }}>
				<Typography variant="h5">Subscription Manager</Typography>
				<Button variant="contained" onClick={handleClick}>
					LOGIN WITH GOOGLE
				</Button>
			</Box>
			{/* {displayed ? (
				displayed.map((subject, idx) => (
					<Typography key={idx} variant="h6">
						{subject}
					</Typography>
				))
			) : null} */}
		</div>
	);
}

export default App;
