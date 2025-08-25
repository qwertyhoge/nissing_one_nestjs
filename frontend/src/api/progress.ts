import axios, { AxiosResponse } from "axios";
import Progress from "../types/Progress";
import { Degree } from "../utils/colorsForDegree";

const api = axios.create({
    baseURL: 'http://localhost:3000'
});

type Data = {
    id: number;
    degree: Degree;
    date: string;
    description: string;
}

const dataToProgress = (data: Data): Progress => {
    console.log(data);
    return {
        ...data,
        date: new Date(data.date)
    };
};


export const getProgresses = async (): Promise<Progress[]> => {
    const res = await api.get('/progress');

    console.log(res.data.map((d: Data) => {
        dataToProgress(d);
    }));

    return res.data.map((d: Data) => dataToProgress(d));
};

export const createProgress = async (progress: Omit<Progress, 'id'>): Promise<Progress> => {
    const res = await api.post('/progress', progress);

    return dataToProgress(res.data);
};

export const updateProgress = async(progress: Progress): Promise<Progress> => {
    const {id, ...dataToUpdate} = progress;
    const res = await api.patch(`/progress/${progress.id}`, dataToUpdate);

    return dataToProgress(res.data);
}

export const deleteProgress = async(id: number): Promise<Progress> => {
    const res = await api.delete(`/progress/${id}`);
    
    return dataToProgress(res.data);
};

