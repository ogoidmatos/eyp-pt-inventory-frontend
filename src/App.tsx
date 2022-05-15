import React, { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Routes, Route } from 'react-router-dom';
import { ProtectedRoute } from './auth/ProtectedRoute';
import './App.css';

import { setAuthToken } from './api/httpClient.api';

import { Home } from './pages/Home';
import { Dashboard } from './pages/Dashboard';

function App() {
	const { getAccessTokenSilently } = useAuth0();

	useEffect(() => {
		(async () => {
			setAuthToken(await getAccessTokenSilently());
		})();
	}, [getAccessTokenSilently]);

	return (
		<Routes>
			<Route path='/' element={<Home />} />
			<Route path='/dashboard' element={<ProtectedRoute element={<Dashboard />} />} />
		</Routes>
	);
}

export default App;
