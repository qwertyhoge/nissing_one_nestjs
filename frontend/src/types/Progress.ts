import { Degree } from "../utils/ColorsForDegree";

export default interface Progress {
    id: number;
    date: Date;
    degree: Degree;
    description: string;
}
