import { Degree } from "./colorsForDegree";
import progressIconN from "../assets/progress_n.png";
import progressIconL from "../assets/progress_l.png";
import progressIconM from "../assets/progress_m.png";
import progressIconH from "../assets/progress_h.png";

const iconsForDegree: Record<Degree, string> = {
    0: progressIconN,
    1: progressIconL,
    2: progressIconM,
    3: progressIconH
};

export function getIconForDegree(degree: Degree){
    return iconsForDegree[degree];
}