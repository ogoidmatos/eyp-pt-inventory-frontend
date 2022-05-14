import { useAuth0 } from '@auth0/auth0-react';
import { Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { User } from '../types/User';
import { getUserAuth } from '../api/auth.api';
import { Login } from '../pages/Login';

type ProtectedRouteProps = {
	element: JSX.Element;
};

export const ProtectedRoute = ({ element }: ProtectedRouteProps) => {
	const { isAuthenticated, isLoading, user } = useAuth0();

	const [userData, setUserData] = useState<User | null>(null);
	const [apiLoading, setApiLoading] = useState(true);

	useEffect(() => {
		(async () => {
			if (user) {
				const { data } = await getUserAuth(user?.sub);
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
				return <div>Please wait until your account is verified!</div>;
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
