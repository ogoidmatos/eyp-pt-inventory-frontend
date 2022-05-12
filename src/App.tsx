import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ProtectedRoute } from './auth/ProtectedRoute';
import './App.css';

import { Home } from './pages/Home';
import { Login } from './pages/Login';

function App() {
	return (
		<Routes>
			<Route path='/' element={<Home />} />
			<Route path='/login' element={<ProtectedRoute element={<Login />} />} />
		</Routes>
	);
}

export default App;
