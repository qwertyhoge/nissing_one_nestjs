import axios from "axios";
import Progress from "../types/Progress";

const api = axios.create({
    baseURL: 'http://localhost:3000'
});


export const getProgresses = async (): Promise<Progress[]> => {
    const res = await api.get('/progress');
    return res.data.map((p: any) => ({
        ...p,
        date: new Date(p.date)
    }));
};

export const createProgress = async (progress: Omit<Progress, 'id'>): Promise<Progress> => {
    const res = await api.post('/progress', progress);
    return res.data;
};

