import React, { useState, useReducer } from 'react';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import { Box, flexbox } from '@mui/system';

const Form = ({ handleFormSubmit }) => {
	const [ name, setName ] = useState('');
	const [ startDate, setStartDate ] = useState('');
	const [ renewalDate, setRenewalDate ] = useState('');
	const [ recurrence, setRecurrence ] = useState('never');
	const [ price, setPrice ] = useState('');
	const handleNameChange = (evt) => {
		setName(evt.target.value);
	};
	const handleStartDateChange = (evt) => {
		setStartDate(evt.target.value);
	};
	const handleRenewalDateChange = (evt) => {
		setRenewalDate(evt.target.value);
	};
	const handleRecurrenceChange = (evt) => {
		setRecurrence(evt.target.value);
	};
	const handlePriceChange = (evt) => {
		setPrice(evt.target.value);
	};
	const handleSubmit = (evt) => {
		evt.preventDefault();
		// const parsed_price = parseFloat(price);
		handleFormSubmit(name, startDate, renewalDate, recurrence, price);
		setName('');
		setStartDate('');
		setRenewalDate('');
		setRecurrence('');
		setPrice('');
	};
	return (
		<form>
			<Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center' }}>
				<TextField label="name" variant="standard" value={name} onChange={handleNameChange} required />
				<TextField
					label="start date"
					variant="standard"
					value={startDate}
					onChange={handleStartDateChange}
					required
				/>
				<TextField
					label="renewal date"
					variant="standard"
					value={renewalDate}
					onChange={handleRenewalDateChange}
					required
				/>
				<FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
					<InputLabel>recurs</InputLabel>
					<Select value={recurrence} onChange={handleRecurrenceChange} label="Recurring">
						<MenuItem value="never">
							<em>Never</em>
						</MenuItem>
						<MenuItem value="weekly">Weekly</MenuItem>
						<MenuItem value="monthly">Monthly</MenuItem>
						<MenuItem value="yearly">Yearly</MenuItem>
					</Select>
				</FormControl>
				<TextField label="price" variant="standard" value={price} onChange={handlePriceChange} type="number" />
				<Button variant="contained" onClick={handleSubmit}>
					SUBMIT
				</Button>
			</Box>
		</form>
	);
};

export default Form;
