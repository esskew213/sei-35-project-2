import React, { useContext } from 'react';
import { Paper, Typography } from '@mui/material';
import { IsLoggedInContext } from '../context/LoggedIn.context';
const Home = () => {
	const [ isLoggedIn, setIsLoggedIn ] = useContext(IsLoggedInContext);
	return (
		<Paper>
			<Typography variant="h5">Home Page</Typography>
		</Paper>
	);
};

export default Home;
