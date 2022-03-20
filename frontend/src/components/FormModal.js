import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import React from 'react';
import NewSubscriptionForm from './NewSubscriptionForm';
const FormModal = ({ modalOpen, handleCloseModal, subscription = null }) => {
	const style = {
		position: 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		width: '80%',
		bgcolor: 'background.paper',
		border: '2px solid #000',
		boxShadow: 24,
		borderRadius: '20px',
		p: 4,
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center'
	};

	return (
		<div>
			<Modal open={modalOpen} onClose={handleCloseModal}>
				<Box sx={style}>
					<NewSubscriptionForm handleCloseModal={handleCloseModal} subscription={subscription} />
				</Box>
			</Modal>
		</div>
	);
};

export default FormModal;
