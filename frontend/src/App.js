import './App.css';
import React, { useState } from 'react';
import SignIn from './pages/SignIn';
import Home from './pages/Home';
import { Routes, Route, Navigate } from 'react-router-dom';
import ScanResults from './pages/ScanResults';
function App() {
	return (
		<Routes>
			<Route path="/" element={<SignIn />} />
			<Route path="home" element={<Home />} />
			<Route path="scan_results" element={<ScanResults />} />
		</Routes>
	);
}

export default App;
