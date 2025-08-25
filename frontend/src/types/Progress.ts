import { Degree } from "../utils/colorsForDegree";

export default interface Progress {
    id: number;
    date: Date;
    degree: Degree;
    description: string;
}
