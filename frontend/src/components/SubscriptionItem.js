import React, { useContext, useState } from 'react';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import FormModal from './FormModal';
import axios from 'axios';
import applyCaseMiddleware from 'axios-case-converter';
import { SubscriptionsContext } from '../context/Subscriptions.context';
const SubscriptionItem = ({ subscription }) => {
	const { getSubscriptions } = useContext(SubscriptionsContext);
	const [ modalOpen, setModalOpen ] = useState(false);
	const handleOpenModal = () => {
		setModalOpen(true);
	};
	const handleCloseModal = () => {
		setModalOpen(false);
	};
	//TODO: convert delete to an "Are you sure?" modal
	const handleDelete = async () => {
		const client = applyCaseMiddleware(axios.create());
		await client.delete('http://127.0.0.1:8000/delete_subscription', {
			params: { subscriptionId: subscription.id },
			headers: { authorization: localStorage.token }
		});
		await getSubscriptions();
	};
	return (
		<Card sx={{ width: 400 }} raised>
			<CardContent>
				<Typography variant="h5">{subscription.name}</Typography>

				<Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
					<Typography variant="body2">Started on: {subscription.dateStarted}</Typography>
					<Typography variant="body2">Recurs: {subscription.recurs}</Typography>
					<Typography variant="body2">Next billing on: {subscription.nextBillingDate}</Typography>
					<Typography variant="body2">Cost: {subscription.priceInDollars}</Typography>
				</Box>
			</CardContent>
			<CardActions>
				<IconButton aria-label="edit" onClick={handleOpenModal}>
					<ModeEditOutlineOutlinedIcon />
				</IconButton>
				<IconButton aria-label="delete" onClick={handleDelete}>
					<DeleteOutlineOutlinedIcon />
				</IconButton>
			</CardActions>
			<FormModal modalOpen={modalOpen} handleCloseModal={handleCloseModal} subscription={subscription} />
		</Card>
	);
};

export default SubscriptionItem;
