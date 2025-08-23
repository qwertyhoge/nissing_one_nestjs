const colorsForDegree = {
    0: "#e8e8e8ff",
    1: "#a4ceecff",
    2: "#98ec9bff",
    3: "#ffbeb3ff"
} as const;

export type Degree = keyof typeof colorsForDegree;

export function getColorForDegree(degree: Degree): string{
    return colorsForDegree[degree];
}
