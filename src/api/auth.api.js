import httpClient from './httpClient.api';

const ENDPOINT = '/user/auth';

export const getUserAuth = async (id) => httpClient.get(`${ENDPOINT}/${id}`);
export const createUser = async (data) => httpClient.post(`${ENDPOINT}`, data);
