import React, { useState, useReducer } from 'react';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormLabel from '@mui/material/FormLabel';

const Form = ({ handleFormSubmit }) => {
	const [ texture, setTexture ] = useState('');
	const [ colour, setColour ] = useState('');
	const [ type, setType ] = useState('');

	const handleTextureChange = (evt) => {
		setTexture(evt.target.value);
	};
	const handleColourChange = (evt) => {
		setColour(evt.target.value);
	};
	const handleTypeChange = (evt) => {
		setType(evt.target.value);
	};
	const handleSubmit = (evt) => {
		evt.preventDefault();
		handleFormSubmit(texture, colour, type);
		setTexture('');
		setColour('');
		setType('');
	};
	return (
		<form>
			<TextField label="Texture" variant="standard" value={texture} onChange={handleTextureChange} />
			<TextField label="Colour" variant="standard" value={colour} onChange={handleColourChange} />
			<TextField label="Type" variant="standard" value={type} onChange={handleTypeChange} />
			<Button variant="contained" onClick={handleSubmit}>
				SUBMIT
			</Button>
		</form>
	);
};

export default Form;
