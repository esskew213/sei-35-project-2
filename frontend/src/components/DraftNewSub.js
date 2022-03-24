import React, { useState, useEffect } from 'react';
import DoneIcon from '@mui/icons-material/Done';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EmailPopover from './EmailPopover';
import {
	Typography,
	Grid,
	Card,
	CardContent,
	CardActions,
	TextField,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	Button,
	InputAdornment,
	Box,
	Divider,
	FormLabel
} from '@mui/material';
import TableDatePicker from './TableDatePicker';
import axios from 'axios';
import applyCaseMiddleware from 'axios-case-converter';
const DraftNewSub = ({
	handleDelete,
	newName = '',
	newDateStarted = new Date(),
	newPriceInDollars = 0,
	newRecurs = 'NEVER',
	messageHtml = '<div>Nothing to display</div>',
	idx
}) => {
	const [ name, setName ] = useState('');
	const [ price, setPrice ] = useState('');
	const [ recurs, setRecurs ] = useState('');
	const [ startDate, setStartDate ] = useState(new Date());
	console.log(newDateStarted);
	useEffect(
		() => {
			setName(newName);
			setPrice(newPriceInDollars);
			setRecurs(newRecurs);
			setStartDate(new Date(newDateStarted));
		},
		[ newName, newPriceInDollars, newRecurs, newDateStarted ]
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
		<Grid item>
			<form onSubmit={handleSubmit}>
				<Card sx={{ width: '60vw', maxWidth: '500px', backgroundColor: '#F5F5F5', padding: '2vh 2vw' }}>
					<CardContent>
						<Box
							sx={{
								display: 'flex',
								flexDirection: 'row',
								flexWrap: 'wrap',
								justifyContent: 'space-between',
								alignItems: 'baseline',
								mb: '1vh'
							}}
						>
							<Typography variant="h6" component="span" sx={{ color: 'primary.main' }}>
								Is this a subscription?
							</Typography>
							<EmailPopover>
								<iframe
									sandbox={null}
									width={400}
									height={400}
									srcDoc={messageHtml}
									title="message-display"
								/>
							</EmailPopover>
						</Box>
						<Divider />
						<Box
							sx={{
								display: 'flex',
								flexDirection: 'row',
								flexWrap: 'wrap',
								justifyContent: 'space-between',
								alignItems: 'flex-end',
								mt: '2vh'
							}}
						>
							<FormControl variant="standard" margin="dense" required sx={{ minWidth: '200px' }}>
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
							<FormControl variant="standard" margin="dense" required sx={{ width: '120px' }}>
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
						</Box>
						<Box
							sx={{
								display: 'flex',
								flexDirection: 'row',
								flexWrap: 'wrap',
								justifyContent: 'space-between',
								alignItems: 'flex-end'
							}}
						>
							<FormControl variant="standard" margin="dense" required sx={{ minWidth: '100px' }}>
								<InputLabel htmlFor="recurs">Recurs</InputLabel>
								<Select
									id="recurs"
									margin="dense"
									value={recurs}
									onChange={handleRecursChange}
									label="Recurs"
								>
									<MenuItem value="NEVER">
										<em>Never</em>
									</MenuItem>
									<MenuItem value={'WEEKLY'}>Weekly</MenuItem>
									<MenuItem value={'MONTHLY'}>Monthly</MenuItem>
									<MenuItem value={'YEARLY'}>Yearly</MenuItem>
								</Select>
							</FormControl>
							<FormControl variant="standard" margin="dense" required sx={{ minWidth: '100px' }}>
								<FormLabel sx={{ fontSize: '0.8rem', mb: '5px' }}>Start date</FormLabel>
								<TableDatePicker
									id="start-date"
									date={startDate}
									onInputChange={handleStartDateChange}
								/>
							</FormControl>
						</Box>
					</CardContent>
					<CardActions sx={{ position: 'relative' }}>
						<Button
							variant="outlined"
							color="error"
							onClick={(evt) => {
								evt.preventDefault();
								handleDelete(idx);
							}}
							sx={{ mr: '5px', width: '120px' }}
							endIcon={<DeleteOutlineOutlinedIcon />}
							margin="dense"
						>
							DELETE
						</Button>
						<Button
							endIcon={<DoneIcon />}
							color="success"
							variant="outlined"
							type="submit"
							sx={{ width: '120px', mr: '30px' }}
							margin="dense"
						>
							SAVE
						</Button>
					</CardActions>
				</Card>
			</form>
		</Grid>
	);
};

export default DraftNewSub;
