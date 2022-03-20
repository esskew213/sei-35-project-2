import './App.css';
import React, { useContext } from 'react';
import SignIn from './pages/SignIn';
import Home from './pages/Home';
import LoggedInContextProvider from './context/LoggedIn.context';
import { Routes, Route } from 'react-router-dom';
import SubscriptionsContextProvider from './context/Subscriptions.context';
import ScanResults from './pages/ScanResults';
function App() {
	return (
		<LoggedInContextProvider>
			<SubscriptionsContextProvider>
				<Routes>
					<Route index element={<SignIn />} />
					<Route path="home" element={<Home />} />
					<Route path="scan_results" element={<ScanResults />} />
				</Routes>
			</SubscriptionsContextProvider>
		</LoggedInContextProvider>
	);
}

export default App;
