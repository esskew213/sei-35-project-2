import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import applyCaseMiddleware from 'axios-case-converter';

export const SubscriptionsContext = createContext();

const SubscriptionsContextProvider = (props) => {
	const [ subscriptions, setSubscriptions ] = useState([]);
	const handleSubscriptionsUpdate = (subscriptions) => {
		setSubscriptions(subscriptions);
		console.log(subscriptions);
	};
	const getSubscriptions = async () => {
		const client = applyCaseMiddleware(axios.create());
		const response = await client.get('http://127.0.0.1:8000/get_subscriptions', {
			headers: { authorization: localStorage.token }
		});
		setSubscriptions(response.data.subscriptions);
	};

	return (
		<SubscriptionsContext.Provider
			value={{ subscriptions, setSubscriptions, getSubscriptions, handleSubscriptionsUpdate }}
		>
			{props.children}
		</SubscriptionsContext.Provider>
	);
};

export default SubscriptionsContextProvider;
