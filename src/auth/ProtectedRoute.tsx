import { useAuth0 } from '@auth0/auth0-react';
import { Navigate } from 'react-router-dom';

type ProtectedRouteProps = {
	element: JSX.Element;
};

export const ProtectedRoute = ({ element }: ProtectedRouteProps) => {
	const { isAuthenticated, isLoading } = useAuth0();
	// add here verification of role
	if (!isLoading) {
		return isAuthenticated ? element : <Navigate to='/' />;
	} else {
		return <div>Fuck</div>;
	}
};
