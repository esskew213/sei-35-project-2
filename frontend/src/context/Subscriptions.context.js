import React, { createContext, useState } from 'react';
export const SubscriptionsContext = createContext();

const SubscriptionsContextProvider = (props) => {
	const [ subscriptions, setSubscriptions ] = useState([]);
	const handleSubscriptionsUpdate = (subscriptions) => {
		setSubscriptions(subscriptions);
		console.log(subscriptions);
	};
	return (
		<SubscriptionsContext.Provider value={{ subscriptions, setSubscriptions, handleSubscriptionsUpdate }}>
			{props.children}
		</SubscriptionsContext.Provider>
	);
};

export default SubscriptionsContextProvider;
