import { ThemeOptions, createTheme } from '@mui/material';

const themeOptions: ThemeOptions = {
	palette: {
		primary: {
			main: 'rgb(56, 69, 149)',
			light: '#949dcf',
			dark: '#273377',
		},
		secondary: {
			main: 'rgb(255, 215, 0)',
			dark: '#debc00',
		},
		background: {
			default: '#e0e2f2',
		},
		error: {
			main: '#b71c1c',
		},
		info: {
			main: '#388ccc',
			dark: '#144f9e',
			light: '#72c2ed',
		},
	},
	typography: {
		fontFamily: '"Source Sans Pro", "Roboto", "Helvetica", "Arial", sans-serif',
	},
};

export const customTheme = createTheme(themeOptions);
