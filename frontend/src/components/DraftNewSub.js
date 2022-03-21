import React, { useState } from 'react';
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
import useInputState from '../hooks/setInputState';
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
	console.log('rendering DraftNewSub ', idx, newName, newPriceInDollars);
	const [ name, handleNameChange ] = useState(newName);
	const [ price, handlePriceChange ] = useState(newPriceInDollars);
	const [ recurs, handleRecursChange ] = useState(newRecurs);
	const [ startDate, setStartDate ] = useState(new Date());
	const handleStartDateChange = (date) => {
		setStartDate(date);
	};
	return (
		<form
			onSubmit={(evt) => {
				evt.preventDefault();
				handleDelete(idx);
			}}
		>
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
				<Button variant="contained" type="submit" sx={{ mx: '15px' }}>
					DELETE
				</Button>
			</Box>
		</form>
	);
};

export default DraftNewSub;
