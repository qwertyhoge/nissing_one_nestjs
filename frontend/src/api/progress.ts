import axios from "axios";

const api = axios.create({
    baseURL: 'http://localhost:3000'
});

export interface Progress {
    id: number;
    date: Date;
    degree: number;
    description: string;
}

export const getUsers = async (): Promise<Progress[]> => {
    const res = await api.get('/progress');
    return res.data;
};

export const createUser = async (progress: Omit<Progress, 'id'>): Promise<Progress> => {
    const res = await api.post('/progress', progress);
    return res.data;
};

