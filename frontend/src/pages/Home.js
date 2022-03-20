import React, { useContext } from 'react';
import { Typography } from '@mui/material';
import { clientGoogle } from '../clientGoogle';
import { IsLoggedInContext } from '../context/LoggedIn.context';
import { GoogleLogout } from 'react-google-login';
import { useNavigate } from 'react-router-dom';
import NewSubscriptionForm from '../components/NewSubscriptionForm';
import SubscriptionsList from '../components/SubscriptionsList';

const Home = () => {
	const clientID = clientGoogle.web.client_id;
	const navigate = useNavigate();
	const [ isLoggedIn, setIsLoggedIn ] = useContext(IsLoggedInContext);
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
