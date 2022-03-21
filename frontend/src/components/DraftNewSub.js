import React, { useState, useEffect } from 'react';

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
import axios from 'axios';
import applyCaseMiddleware from 'axios-case-converter';
const DraftNewSub = ({
	handleDelete,
	newName = null,
	newDateStarted = new Date(),
	newPriceInDollars = null,
	newRecurs = 'NEVER',
	idx
}) => {
	const [ name, setName ] = useState('');
	const [ price, setPrice ] = useState('');
	const [ recurs, setRecurs ] = useState('');
	const [ startDate, setStartDate ] = useState(new Date());

	useEffect(
		() => {
			setName(newName);
			setPrice(newPriceInDollars);
			setRecurs(newRecurs);
		},
		[ newName, newPriceInDollars, newRecurs ]
	);

	const handleNameChange = (evt) => {
		setName(evt.target.value);
	};
	const handlePriceChange = (evt) => {
		setPrice(evt.target.value);
	};
	const handleRecursChange = (evt) => {
		setRecurs(evt.target.value);
	};

	const handleStartDateChange = (date) => {
		setStartDate(date);
	};

	const handleSubmit = async (evt) => {
		evt.preventDefault();
		const dateStarted = startDate.toISOString().split('T')[0];
		console.log(dateStarted);
		const priceInDollars = parseFloat(price).toFixed(2);
		const newSubscription = { dateStarted, name, priceInDollars, recurs };
		const client = applyCaseMiddleware(axios.create());
		await client.post(
			'http://127.0.0.1:8000/add_subscriptions',
			{ subscriptions: [ newSubscription ] },
			{
				headers: { authorization: localStorage.token }
			}
		);
		handleDelete(idx);
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
				<Button
					variant="contained"
					onClick={(evt) => {
						evt.preventDefault();
						handleDelete(idx);
					}}
					sx={{ mx: '15px' }}
				>
					DELETE
				</Button>
				<Button variant="contained" type="submit" sx={{ mx: '15px' }}>
					SUBMIT
				</Button>
			</Box>
		</form>
	);
};

export default DraftNewSub;
