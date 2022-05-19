import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

export const Dashboard = () => {
	const { logout } = useAuth0();
	return (
		<>
			<div>Dashboard</div>
			<button onClick={() => logout()}>Logout</button>
		</>
	);
};
