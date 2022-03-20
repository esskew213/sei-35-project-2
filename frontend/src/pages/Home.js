import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Typography, Avatar, Box, Button } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { clientGoogle } from '../clientGoogle';
import { IsLoggedInContext } from '../context/LoggedIn.context';
import { GoogleLogout } from 'react-google-login';
import { useNavigate } from 'react-router-dom';
import NewSubscriptionForm from '../components/NewSubscriptionForm';
import SubscriptionsList from '../components/SubscriptionsList';
import axios from 'axios';
import applyCaseMiddleware from 'axios-case-converter';
import { SubscriptionsContext } from '../context/Subscriptions.context';

const Home = () => {
	const clientID = clientGoogle.web.client_id;
	const navigate = useNavigate();
	const { userInfo, setUserInfo, isLoggedIn, setIsLoggedIn } = useContext(IsLoggedInContext);
	const { getSubscriptions } = useContext(SubscriptionsContext);
	const logout = () => {
		setIsLoggedIn(false);
		localStorage.clear();
		navigate('/');
		setUserInfo({ name: 'Anonymous Badger', photoUrl: '' });
	};
	const handleNewScan = async () => {
		const client = applyCaseMiddleware(axios.create());
		const response = await client.get('http://127.0.0.1:8000/fetch_new_subscriptions', {
			headers: { authorization: localStorage.token }
		});
		await client.post(
			'http://127.0.0.1:8000/add_subscriptions',
			{ subscriptions: response.data.subscriptions },
			{
				headers: { authorization: localStorage.token }
			}
		);
		getSubscriptions();
		console.log(response.data.subscriptions);
	};
	return (
		<React.Fragment>
			{isLoggedIn ? (
				<React.Fragment>
					<Box
						sx={{
							display: 'flex',
							flexDirection: 'row',
							justifyContent: 'flex-start',
							alignItems: 'baseline'
						}}
					>
						<Avatar alt={userInfo.name} src={userInfo.photoUrl} sx={{ width: 56, height: 56 }} />
						<Typography variant="h4">Welcome back, {userInfo.name}.</Typography>
					</Box>
					<GoogleLogout clientId={clientID} buttonText="Logout" onLogoutSuccess={logout} />
					<NewSubscriptionForm />
					<Button variant="contained" color="secondary" endIcon={<AddCircleIcon />}>
						ADD NEW SUBSCRIPTION
					</Button>
					<Button variant="contained" color="success" endIcon={<AddCircleIcon />} onClick={handleNewScan}>
						SYNC
					</Button>
					<SubscriptionsList />
				</React.Fragment>
			) : (
				<Link to="/">Please log in to view this page</Link>
			)}
		</React.Fragment>
	);
};

export default Home;
