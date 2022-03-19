import React, { useContext, useState, useEffect } from 'react';
import { Paper, Typography } from '@mui/material';
import { clientGoogle } from '../clientGoogle';
import { IsLoggedInContext } from '../context/LoggedIn.context';
import { GoogleLogout } from 'react-google-login';
import { useNavigate } from 'react-router-dom';
import NewSubscriptionForm from '../components/NewSubscriptionForm';
import SubscriptionsList from '../components/SubscriptionsList';
import axios from 'axios';
import applyCaseMiddleware from 'axios-case-converter';

const Home = () => {
	const clientID = clientGoogle.web.client_id;
	const navigate = useNavigate();
	const [ isLoggedIn, setIsLoggedIn ] = useContext(IsLoggedInContext);
	const [ subscriptions, setSubscriptions ] = useState([]);

	useEffect(() => {
		const get_subscriptions = async () => {
			const client = applyCaseMiddleware(axios.create());
			const response = await client.get('http://127.0.0.1:8000/get_subscriptions', {
				headers: { authorization: localStorage.token }
			});
			setSubscriptions(response.data.subscriptions);
		};
		get_subscriptions();
	}, []);

	const handleSubscriptionsUpdate = (subscriptions) => {
		setSubscriptions(subscriptions);
	};

	const logout = () => {
		setIsLoggedIn(false);
		localStorage.clear();
		navigate('/');
	};

	return (
		<Paper>
			<Typography variant="h5">Home Page</Typography>
			<GoogleLogout clientId={clientID} buttonText="Logout" onLogoutSuccess={logout} />
			<NewSubscriptionForm handleSubscriptionsUpdate={handleSubscriptionsUpdate} />
			<SubscriptionsList subscriptions={subscriptions} />
		</Paper>
	);
};

export default Home;
