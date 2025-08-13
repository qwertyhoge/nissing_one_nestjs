import axios from "axios";

const api = axios.create({
    baseURL: 'http://localhost:3000'
});

export interface User {
    id: number;
    name: string;
    email: string;
}

export const getUsers = async (): Promise<User[]> => {
    const res = await api.get('/user');
    return res.data;
};

export const createUser = async (user: Omit<User, 'id'>): Promise<User> => {
    const res = await api.post('/user', user);
    return res.data;
};

