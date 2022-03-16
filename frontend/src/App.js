import './App.css';
import axios from 'axios';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import React, { useEffect, useState } from 'react';

function App() {
	const [ displayed, setDisplayed ] = useState('');

	const makeAPICall = async () => {
		const loginResponse = await axios.get('http://127.0.0.1:8000/login');
		if (loginResponse.data.login_success === true) {
			const subjectsResponse = await axios.get('http://127.0.0.1:8000/message_subjects');
			console.log(subjectsResponse.data.subjects);
			setDisplayed(subjectsResponse.data.subjects);
		}
	};

	const handleClick = (evt) => {
		evt.preventDefault();
		makeAPICall();
	};
	return (
		<div className="App">
			<Button variant="contained" onClick={handleClick}>
				CLICK ME
			</Button>
			{displayed ? (
				displayed.map((subject, idx) => (
					<Typography key={idx} variant="h5">
						{subject}
					</Typography>
				))
			) : null}
		</div>
	);
}

export default App;
