import React, { createContext, useState } from 'react';
export const IsLoggedInContext = createContext();

const LoggedInContextProvider = (props) => {
	const [ isLoggedIn, setIsLoggedIn ] = useState(false);

	return (
		<IsLoggedInContext.Provider value={[ isLoggedIn, setIsLoggedIn ]}>{props.children}</IsLoggedInContext.Provider>
	);
};

export default LoggedInContextProvider;
