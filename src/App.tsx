import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ProtectedRoute } from './auth/ProtectedRoute';
import './App.css';

import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';

function App() {
	return (
		<Routes>
			<Route path='/' element={<Home />} />
			<Route path='/login' element={<ProtectedRoute element={<Login />} />} />
			<Route path='/dashboard' element={<ProtectedRoute element={<Dashboard />} />} />
		</Routes>
	);
}

export default App;
