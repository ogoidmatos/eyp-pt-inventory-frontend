import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Auth0Provider } from '@auth0/auth0-react';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
	<React.StrictMode>
		<BrowserRouter>
			<Auth0Provider
				domain={process.env.REACT_APP_AUTH0_DOMAIN || ''}
				clientId={process.env.REACT_APP_AUTH0_CLIENT_ID || ''}
				redirectUri='http://localhost:3000/login'
				useRefreshTokens
				cacheLocation='localstorage'
			>
				<App />
			</Auth0Provider>
		</BrowserRouter>
	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
