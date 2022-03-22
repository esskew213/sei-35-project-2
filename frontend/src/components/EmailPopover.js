import React, { useState } from 'react';
import Popover from '@mui/material/Popover';
import Button from '@mui/material/Button';

export default function EmailPopover(props) {
	const [ anchorEl, setAnchorEl ] = useState(null);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const open = Boolean(anchorEl);

	return (
		<React.Fragment>
			<Button color="info" onClick={handleClick}>
				View email
			</Button>
			<Popover
				id="mouse-over-popover"
				open={open}
				anchorEl={anchorEl}
				onClose={handleClose}
				anchorOrigin={{
					vertical: 'top',
					horizontal: 'right'
				}}
				transformOrigin={{
					vertical: 'bottom',
					horizontal: 'left'
				}}
			>
				{props.children}
			</Popover>
		</React.Fragment>
	);
}
