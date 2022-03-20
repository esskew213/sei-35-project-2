import React, { useState } from 'react';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import FormModal from './FormModal';
const SubscriptionItem = ({ subscription }) => {
	const [ modalOpen, setModalOpen ] = useState(false);
	const handleOpenModal = () => {
		setModalOpen(true);
	};
	const handleCloseModal = () => {
		setModalOpen(false);
	};
	return (
		<Card sx={{ width: 400 }} raised>
			<CardContent>
				<Typography variant="h5">{subscription.name}</Typography>

				<Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
					<Typography variant="body2">Started on: {subscription.dateStarted}</Typography>
					<Typography variant="body2">Recurs: {subscription.recurs}</Typography>
					<Typography variant="body2">Cost: {subscription.priceInDollars}</Typography>
				</Box>
			</CardContent>
			<CardActions>
				<IconButton aria-label="edit" onClick={handleOpenModal}>
					<ModeEditOutlineOutlinedIcon />
				</IconButton>
				<IconButton aria-label="delete">
					<DeleteOutlineOutlinedIcon />
				</IconButton>
			</CardActions>
			<FormModal modalOpen={modalOpen} handleCloseModal={handleCloseModal} />
		</Card>
	);
};

export default SubscriptionItem;
