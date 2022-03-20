import React, { useContext, useEffect } from 'react';
import { Typography, Avatar, Box, Button } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { clientGoogle } from '../clientGoogle';
import { IsLoggedInContext } from '../context/LoggedIn.context';
import { GoogleLogout } from 'react-google-login';
import { useNavigate } from 'react-router-dom';
import NewSubscriptionForm from '../components/NewSubscriptionForm';
import SubscriptionsList from '../components/SubscriptionsList';

const Home = () => {
	const clientID = clientGoogle.web.client_id;
	const navigate = useNavigate();
	const { userInfo, setUserInfo, setIsLoggedIn } = useContext(IsLoggedInContext);
	console.log(userInfo);
	const logout = () => {
		setIsLoggedIn(false);
		localStorage.clear();
		navigate('/');
		setUserInfo({ name: 'Anonymous Badger', photoUrl: '' });
	};

	return (
		<React.Fragment>
			<Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'baseline' }}>
				<Avatar alt={userInfo.name} src={userInfo.photoUrl} sx={{ width: 56, height: 56 }} />
				<Typography variant="h4">Welcome back, {userInfo.name}.</Typography>
			</Box>
			<GoogleLogout clientId={clientID} buttonText="Logout" onLogoutSuccess={logout} />
			<NewSubscriptionForm />
			<Button variant="contained" endIcon={<AddCircleIcon />}>
				ADD NEW SUBSCRIPTION
			</Button>
			<SubscriptionsList />
		</React.Fragment>
	);
};

export default Home;
