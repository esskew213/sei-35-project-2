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
			sx={{ height: '100vh', width: '100%' }}
			spacing={2}
			direction="row"
			justifyContent="center"
			alignItems="space-between"
		>
			<Grid item md={4} style={{ backgroundColor: 'cornflowerblue' }}>
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						justifyContent: 'center',
						height: '100%',
						textAlign: 'center'
					}}
				>
					<Typography color="white" variant="h5" gutterBottom>
						Let's get started
					</Typography>
					<GoogleLogin
						clientId={clientID}
						buttonText="Login with Google"
						onSuccess={sendTokenToServer}
						onFailure={failureResponse}
						cookiePolicy={'single_host_origin'}
					/>
				</Box>
			</Grid>
			<Grid
				item
				md={8}
				style={{
					backgroundImage: `url("https://images.unsplash.com/photo-1634733988138-bf2c3a2a13fa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fGJpbGxzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60")`,
					backgroundSize: 'cover',
					backgroundRepeat: 'no-repeat'
				}}
			/>
		</Grid>
	);
};

export default SignIn;
