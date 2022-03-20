import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import React, { useState, useContext } from 'react';
import NewSubscriptionForm from './NewSubscriptionForm';
const FormModal = ({ modalOpen, handleCloseModal, subscription }) => {
	const style = {
		position: 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		width: 400,
		bgcolor: 'background.paper',
		border: '2px solid #000',
		boxShadow: 24,
		p: 4
	};

	return (
		<div>
			<Modal
				open={modalOpen}
				onClose={handleCloseModal}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
				keepMounted
			>
				<Box sx={style}>
					<NewSubscriptionForm handleCloseModal={handleCloseModal} subscription={subscription} />
				</Box>
			</Modal>
		</div>
	);
};

export default FormModal;
