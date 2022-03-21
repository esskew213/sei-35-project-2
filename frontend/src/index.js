import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SubscriptionsContextProvider from './context/Subscriptions.context';
import LoggedInContextProvider from './context/LoggedIn.context';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { amber, blueGrey } from '@mui/material/colors';

const theme = createTheme({
	palette: {
		primary: blueGrey,
		secondary: amber
	},
	typography: {
		fontFamily: 'Raleway',
		fontWeightLight: 200,
		fontWeightRegular: 400,
		fontWeightMedium: 600,
		fontWeightBold: 700
	}
});

ReactDOM.render(
	<React.StrictMode>
		<ThemeProvider theme={theme}>
			<LoggedInContextProvider>
				<SubscriptionsContextProvider>
					<BrowserRouter>
						<Routes>
							<Route path="/*" element={<App />} />
						</Routes>
					</BrowserRouter>
				</SubscriptionsContextProvider>
			</LoggedInContextProvider>
		</ThemeProvider>
	</React.StrictMode>,
	document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
