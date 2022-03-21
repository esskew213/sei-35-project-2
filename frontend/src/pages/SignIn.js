import React, { useContext, useEffect } from 'react';
import { clientGoogle } from '../clientGoogle';
import GoogleLogin from 'react-google-login';
import axios from 'axios';
import { Typography, Grid, Box } from '@mui/material';
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
		<Grid
			container
			sx={{ height: '100vh', width: '100vw', m: 0 }}
			spacing={2}
			direction="row"
			justifyContent="center"
			alignItems="space-between"
			wrap="wrap-reverse"
		>
			<Grid item sm={4} xs={12} sx={{ backgroundColor: 'primary.dark' }}>
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'flex-start',
						justifyContent: 'center',
						height: '100%',
						ml: '5%'
					}}
				>
					<Typography sx={{ textAlign: 'left', maxWidth: '300px' }} color="white" variant="h5" gutterBottom>
						Never lose track of your subscriptions again.
					</Typography>
					<GoogleLogin
						clientId={clientID}
						buttonText="Get started with Google"
						onSuccess={sendTokenToServer}
						onFailure={failureResponse}
						cookiePolicy={'single_host_origin'}
					/>
				</Box>
			</Grid>
			<Grid
				item
				sm={8}
				xs={12}
				sx={{
					backgroundImage: `url("https://images.unsplash.com/photo-1634733988138-bf2c3a2a13fa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fGJpbGxzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60")`,
					backgroundSize: 'cover',
					backgroundPosition: 'left center',
					backgroundRepeat: 'no-repeat',
					backgroundOrigin: 'border-box'
				}}
			/>
		</Grid>
	);
};

export default SignIn;
