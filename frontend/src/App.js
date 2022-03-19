import './App.css';
import React, { useEffect, useState } from 'react';
import SignIn from './pages/SignIn';
import Home from './pages/Home';
import LoggedInContextProvider from './context/LoggedIn.context';
import { Routes, Route } from 'react-router-dom';
function App() {
	return (
		<LoggedInContextProvider>
			<Routes>
				<Route index element={<SignIn />} />
				<Route path="home" element={<Home />} />
			</Routes>
		</LoggedInContextProvider>
	);
}

export default App;
