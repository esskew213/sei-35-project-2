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
import { SubscriptionsContext } from '../context/Subscriptions.context';

const Home = () => {
	const clientID = clientGoogle.web.client_id;
	const navigate = useNavigate();
	const [ isLoggedIn, setIsLoggedIn ] = useContext(IsLoggedInContext);
	const { subscriptions, setSubscriptions } = useContext(SubscriptionsContext);
	useEffect(() => {
		const getSubscriptions = async () => {
			const client = applyCaseMiddleware(axios.create());
			const response = await client.get('http://127.0.0.1:8000/get_subscriptions', {
				headers: { authorization: localStorage.token }
			});
			setSubscriptions(response.data.subscriptions);
		};
		getSubscriptions();
		console.log(subscriptions);
	}, []);

	const logout = () => {
		setIsLoggedIn(false);
		localStorage.clear();
		navigate('/');
	};

	return (
		<React.Fragment>
			<Typography variant="h5">Home Page</Typography>
			<GoogleLogout clientId={clientID} buttonText="Logout" onLogoutSuccess={logout} />
			<NewSubscriptionForm />
			<SubscriptionsList />
		</React.Fragment>
	);
};

export default Home;
