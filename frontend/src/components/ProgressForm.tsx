import { useState } from "react";
import { Degree } from "../utils/ColorsForDegree"
import Progress from "../types/Progress";

type Props = {
    handleSubmit: Function;
    selectedDate: Date;
    currentProgress?: Progress
};

export default function ProgressForm(props: Props){
    const [degree, setDegree] = useState<Degree>(props.currentProgress?.degree ?? 0);
    const [description, setDescription] = useState<string>(props.currentProgress?.description ?? "");

    return (
        <form onSubmit={(e) => {
            e.preventDefault();
            props.handleSubmit({degree, description});
        }}>
            <div className="flex justify-center text-center">
                <div className="w-1/3 cursor-pointer" onClick={() => setDegree(1)}>
                    1
                </div>
                <div className="w-1/3 cursor-pointer" onClick={() => setDegree(2)}>
                    2
                </div>
                <div className="w-1/3 cursor-pointer" onClick={() => setDegree(3)}>
                    3
                </div>
            </div>
            <textarea className="w-full" onChange={(e) => {setDescription(e.target.value)}}>{description}</textarea>
            <button type="submit">
                a
            </button>
        </form>
    )
}