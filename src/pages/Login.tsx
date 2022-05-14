import { useAuth0 } from '@auth0/auth0-react';
import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { getUserAuth, createUser } from '../api/auth.api';
import { User } from '../types/User';
import { TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';

export const Login = () => {
	const { user } = useAuth0();

	const [userData, setUserData] = useState<User | null>(null);
	const [name, setName] = useState('');
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);

	useEffect(() => {
		(async () => {
			const { data } = await getUserAuth(user?.sub);
			setUserData(data);
		})();
	}, []);

	const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setName(e.target.value);
	};

	const handleSubmit = async () => {
		setLoading(true);
		if (name.length < 1 || name.length > 255) {
			setError(true);
			setLoading(false);
			return;
		}
		const { data } = await createUser({ id: user?.sub, name });
		setLoading(false);
		setUserData(data);
	};

	if (userData === null) {
		return (
			<>
				<TextField
					autoComplete='off'
					name='name'
					label='Name'
					variant='outlined'
					required
					onChange={handleNameChange}
					error={error}
					helperText={!error ? '' : 'Name must have between 1 and 255 characters!'}
				/>
				<LoadingButton loading={loading} onClick={handleSubmit}>
					Create User
				</LoadingButton>
			</>
		);
	} else if (userData.status == false) {
		return <div>Please wait until your account is verified!</div>;
	} else {
		return <Navigate to='/dashboard' />;
	}
};
