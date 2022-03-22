import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { Typography, Avatar, Box, Button } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { clientGoogle } from '../clientGoogle';
import { IsLoggedInContext } from '../context/LoggedIn.context';
import { GoogleLogout } from 'react-google-login';
import { useNavigate } from 'react-router-dom';
import SubscriptionsList from '../components/SubscriptionsList';
import FormModal from '../components/FormModal';
import SyncIcon from '@mui/icons-material/Sync';

const Home = () => {
	const clientID = clientGoogle.web.client_id;
	const navigate = useNavigate();
	const { userInfo, setUserInfo, isLoggedIn, setIsLoggedIn } = useContext(IsLoggedInContext);

	// console.log('LOGGED IN:', isLoggedIn);
	const logout = () => {
		setIsLoggedIn(false);
		localStorage.clear();
		navigate('/');
		setUserInfo({ name: 'Anonymous Badger', photoUrl: '' });
	};
	const [ modalOpen, setModalOpen ] = useState(false);
	const handleOpenModal = () => {
		setModalOpen(true);
	};
	const handleCloseModal = () => {
		setModalOpen(false);
	};
	const handleNewScan = async () => {
		navigate('/scan_results');
	};
	return (
		<React.Fragment>
			{isLoggedIn ? (
				<React.Fragment>
					<Box
						sx={{
							display: 'flex',
							flexDirection: 'row',
							justifyContent: 'space-between',
							alignItems: 'flex-end',
							width: '100vw',
							backgroundColor: 'primary.dark',
							height: '150px',
							boxSizing: 'border-box',
							padding: '30px'
						}}
					>
						<Box
							sx={{
								display: 'flex',
								flexDirection: 'row',
								justifyContent: 'flex-start',
								alignItems: 'flex-end'
							}}
						>
							<Avatar
								alt={userInfo.name}
								src={userInfo.photoUrl}
								sx={{ width: '90px', height: '90px', mr: '20px' }}
							/>
							<Typography color="white" variant="h3" sx={{ lineHeight: 1 }}>
								Welcome back, {userInfo.name}.
							</Typography>
						</Box>
						<GoogleLogout clientId={clientID} buttonText="LOGOUT" onLogoutSuccess={logout} />
					</Box>
					<Box sx={{ position: 'fixed', bottom: 20, right: 20 }}>
						<Button
							variant="contained"
							onClick={handleNewScan}
							color="info"
							sx={{ width: '150px', mb: '10px' }}
							endIcon={<SyncIcon />}
						>
							SYNC
						</Button>
						<br />
						<Button
							variant="contained"
							sx={{ width: '150px' }}
							onClick={handleOpenModal}
							color="secondary"
							endIcon={<AddCircleIcon />}
						>
							ADD NEW
						</Button>
					</Box>
					<Box
						sx={{
							height: '100%',
							p: '5vh 0',
							backgroundColor: 'primary.light',
							backgroundOrigin: 'border-box',
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center'
						}}
					>
						<SubscriptionsList />
					</Box>
					<FormModal modalOpen={modalOpen} handleCloseModal={handleCloseModal} />
				</React.Fragment>
			) : (
				<Link to="/">Please log in to view this page</Link>
			)}
		</React.Fragment>
	);
};

export default Home;
