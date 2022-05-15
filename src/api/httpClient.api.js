import axios from 'axios';

const httpClient = axios.create({
	baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000',
	headers: {
		'Content-Type': 'application/json',
	},
});

let accessToken;

export const setAuthToken = (token) => (accessToken = token);

const authInterceptor = (config) => {
	if (accessToken) config.headers['Authorization'] = `Bearer ${accessToken}`;

	return config;
};

// interceptor to catch errors
const errorInterceptor = (error) => {
	// check if it's a server error
	if (!error.response) {
		// if it's a server error, show a message
		return Promise.reject(error);
	}

	if (error.config.skipInterceptor) {
		return Promise.reject(error);
	}

	// all the other error responses
	switch (error.response.status) {
		case 400:
			console.error(error.response.status, error.message);

			break;

		case 401: // authentication error, logout the user
			// Will need update when login is finalized

			//localStorage.removeItem('token');
			window.location.replace(window.location.origin);
			break;

		case 409:
			break;

		case 500:
			console.error(error.response.status, error.message);
			break;

		default:
			console.error(error.response.status, error.message);
	}
	return Promise.reject(error);
};

// Interceptor for responses
// Useless for now but gotta be there i guess for axios' response interceptor, might update in the future for other success successful statuses
const responseInterceptor = (response) => {
	switch (response.status) {
		case 200:
			// yay!
			break;
		// any other cases
		default:
		// default case
	}

	return response;
};

httpClient.interceptors.request.use(authInterceptor);
httpClient.interceptors.response.use(responseInterceptor, errorInterceptor);

export default httpClient;
