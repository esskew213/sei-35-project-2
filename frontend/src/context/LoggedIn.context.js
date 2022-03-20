import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import applyCaseMiddleware from 'axios-case-converter';

export const IsLoggedInContext = createContext();

const LoggedInContextProvider = (props) => {
	const [ isLoggedIn, setIsLoggedIn ] = useState(false);
	const [ userInfo, setUserInfo ] = useState({ name: 'Anonymous Badger', photoUrl: '' });
	const getUserInfo = async () => {
		const client = applyCaseMiddleware(axios.create());
		console.log('sent in getUserInfo', localStorage.token);
		const response = await client.get('http://127.0.0.1:8000/get_user_info', {
			headers: { authorization: localStorage.token }
		});
		setUserInfo({ name: response.data.name, photoUrl: response.data.photoUrl });
	};
	return (
		<IsLoggedInContext.Provider value={{ userInfo, isLoggedIn, setUserInfo, getUserInfo, setIsLoggedIn }}>
			{props.children}
		</IsLoggedInContext.Provider>
	);
};

export default LoggedInContextProvider;
