import { useAuth0 } from '@auth0/auth0-react';
import { Paper, Button, Typography } from '@mui/material';
import eypPtLogoWide from '../assets/eyp-pt-logo-wide.png';

export const Home = () => {
	const { loginWithRedirect } = useAuth0();
	return (
		<div className='center-container'>
			<Paper className='home-paper' elevation={3}>
				<div>
					<img src={eypPtLogoWide} alt='eyp-pt-logo-wide' className='home-logo' />
				</div>
				<Typography variant='h4' className='home-header'>
					Welcome to EYP PT&apos;s Inventory Database!
				</Typography>
				<div className='home-buttons-div'>
					<Button variant='contained' onClick={() => loginWithRedirect()} className='home-button'>
						Log In
					</Button>
					<Button
						variant='contained'
						// eslint-disable-next-line camelcase
						onClick={() => loginWithRedirect({ screen_hint: 'signup' })}
						className='home-button'
					>
						Sign Up
					</Button>
				</div>
			</Paper>
		</div>
	);
};
