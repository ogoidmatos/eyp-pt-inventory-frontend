import { useAuth0 } from '@auth0/auth0-react';
import { Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { User } from '../types/User';
import { getUserAuth } from '../api/auth.api';
import { Login } from '../pages/Login';
import { Typography, Box } from '@mui/material';

type ProtectedRouteProps = {
	element: JSX.Element;
};

export const ProtectedRoute = ({ element }: ProtectedRouteProps) => {
	const { isAuthenticated, isLoading, user, getAccessTokenSilently } = useAuth0();

	const [userData, setUserData] = useState<User | null>(null);
	const [apiLoading, setApiLoading] = useState(true);

	useEffect(() => {
		(async () => {
			if (user) {
				await getAccessTokenSilently();
				const { data } = await getUserAuth(user.sub);
				setUserData(data);
				setApiLoading(false);
			}
		})();
	}, [user]);

	// add here verification of role
	if (!isLoading && !apiLoading) {
		if (isAuthenticated) {
			if (userData === null) {
				return <Login userId={user!.sub!} setUserData={setUserData} />;
			} else if (userData.status === false) {
				return (
					<div className='center-container'>
						<Box sx={{ padding: '40px', textAlign: 'center' }}>
							<Typography variant='h2' sx={{ fontSize: 'clamp(2em, 5vw, 3em)', margin: '30px 0' }}>
								Please wait until your account is verified!
							</Typography>
							<Typography variant='h6' sx={{ fontSize: 'clamp(0.83em, 2.08vw, 1.25em)' }}>
								Please contact the board of EYP PT in case of problems.
							</Typography>
						</Box>
					</div>
				);
			} else {
				return element;
			}
		} else {
			return <Navigate to='/' />;
		}
	} else {
		return <div>Fuck</div>;
	}
};
