import React, { useContext, useState } from 'react';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { Divider } from '@mui/material';
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
		<Card
			sx={{
				width: '60vw',
				boxSizing: 'border-box',
				maxWidth: '550px',
				backgroundColor: '#F5F5F5',
				padding: '0 2vw'
			}}
		>
			<CardContent>
				<Typography variant="h4" sx={{ color: 'primary.dark' }} gutterBottom>
					{subscription.name}
				</Typography>
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'row',
						flexWrap: 'wrap',
						justifyContent: 'space-between',
						alignItems: 'center',
						mb: '5px'
					}}
				>
					<Typography component="span" variant="body1" sx={{ mr: '30%' }}>
						Started on: <strong>{subscription.dateStarted}</strong>
					</Typography>
					<Typography component="span" variant="body1">
						Recurs:{' '}
						<strong>
							{subscription.recurs.substring(0, 1) + subscription.recurs.substring(1).toLowerCase()}
						</strong>
					</Typography>
				</Box>
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'row',
						flexWrap: 'wrap',
						justifyContent: 'space-between',
						alignItems: 'center'
					}}
				>
					<Typography component="span" variant="body1">
						Next billing on: <strong>{subscription.nextBillingDate}</strong>
					</Typography>
					<Typography component="span" variant="body1">
						Cost: <strong>${subscription.priceInDollars.toFixed(2)}</strong>
					</Typography>
				</Box>
			</CardContent>
			<Divider />
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
