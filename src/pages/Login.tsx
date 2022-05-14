import { useState } from 'react';
import { createUser } from '../api/auth.api';
import { User } from '../types/User';
import { TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';

interface LoginProps {
	userId: string;
	setUserData: (user: User) => void;
}

export const Login = (props: LoginProps) => {
	const { userId, setUserData } = props;

	const [name, setName] = useState('');
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);

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
		const { data } = await createUser({ id: userId, name });
		setLoading(false);
		setUserData(data);
	};
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
};
