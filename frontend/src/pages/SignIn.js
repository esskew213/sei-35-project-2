import React, { useContext, useEffect } from 'react';
import { clientGoogle } from '../clientGoogle';
import GoogleLogin from 'react-google-login';
import axios from 'axios';
import { Typography } from '@mui/material';
import { IsLoggedInContext } from '../context/LoggedIn.context';
import { useNavigate } from 'react-router-dom';
const SignIn = () => {
	const { isLoggedIn, setIsLoggedIn, getUserInfo } = useContext(IsLoggedInContext);
	const navigate = useNavigate();
	if (!isLoggedIn) {
		localStorage.clear();
	}

	// importing clientID from a file that will not be uploaded to Github
	const clientID = clientGoogle.web.client_id;
	const sendTokenToServer = async (response) => {
		console.log(response.tokenId);
		const tokenAsJSON = await axios.get('http://127.0.0.1:8000/sign_in', {
			headers: { authorization: response.tokenId }
		});
		// Not safe, look into using closure variables / service workers at a later date
		localStorage.setItem('token', tokenAsJSON.data.user_id);
		console.log('saved on sign in', localStorage.token);
		setIsLoggedIn(true);
		getUserInfo();
		navigate(`/home`);
	};
	// TO DO rewrite failure function
	const failureResponse = (response) => {
		console.log(response);
	};
	return (
		<React.Fragment>
			<Typography variant="h4">LOG IN WITH GOOGLE</Typography>
			<GoogleLogin
				clientId={clientID}
				buttonText="Login with Google"
				onSuccess={sendTokenToServer}
				onFailure={failureResponse}
				cookiePolicy={'single_host_origin'}
			/>
		</React.Fragment>
	);
};

export default SignIn;
