import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SubscriptionsContextProvider from './context/Subscriptions.context';
import LoggedInContextProvider from './context/LoggedIn.context';

ReactDOM.render(
	<React.StrictMode>
		<LoggedInContextProvider>
			<SubscriptionsContextProvider>
				<BrowserRouter>
					<Routes>
						<Route path="/*" element={<App />} />
					</Routes>
				</BrowserRouter>
			</SubscriptionsContextProvider>
		</LoggedInContextProvider>
	</React.StrictMode>,
	document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
