import { useState } from "react";
import { Degree } from "../utils/colorsForDegree";
import Progress from "../types/Progress";
import { getIconForDegree } from "../utils/iconsForDegree";

type Props = {
    handleSubmit: Function;
    onClose: Function;
    selectedDate: Date;
    submitText: string;
    currentProgress?: Progress
};

export default function ProgressForm(props: Props){
    const [degree, setDegree] = useState<Degree>(props.currentProgress?.degree ?? 0);
    const [description, setDescription] = useState<string>(props.currentProgress?.description ?? "");

    return (
        <div>
            <div className="text-right mb-8">
                <button
                    className="relative w-12 h-12 rounded-full border shadow-sm text-lg text-gray-500"
                    onClick={() => {props.onClose()}}
                >
                    <div className="absolute h-4 w-0 border border-gray-400 m-auto top-0 right-0 left-0 bottom-0 rotate-45">
                    </div>
                    <div className="absolute h-0 w-4 border border-gray-400 m-auto top-0 right-0 left-0 bottom-0 rotate-45">
                    </div>
                </button>
            </div>
            <form onSubmit={(e) => {
                e.preventDefault();
                props.handleSubmit({degree, description});
            }}>
                <div className="flex justify-center text-center">
                    {([1, 2, 3] as const).map((d: Degree) => {
                        return (<DegreeButton
                            degree={d}
                            setDegree={setDegree}
                            selected={degree === d}
                        />
                        );
                    })}
                </div>
                <textarea className="w-full border rounded mt-8 resize-none p-2" onChange={(e) => {setDescription(e.target.value)}}>{description}</textarea>
                <div className="text-center">
                    <button className="mt-8 px-6 py-2 w-fit inline bg-blue-500 rounded text-white" type="submit">
                        {props.submitText}
                    </button>
                </div>
            </form>
        </div>
    )
}

function DegreeButton({degree, setDegree, selected}: {degree: Degree, setDegree: Function, selected: boolean}){
    const className = "w-1/3 h-20 transition cursor-pointer text-center border m-1 p-1" + (selected? " bg-gray-50 translate-y-1": " shadow-sm");

    return (
        <div
            className={className}
            onClick={() => selected? setDegree(0): setDegree(degree)}>
            <img src={getIconForDegree(degree)} className="h-full inline">
            </img>
        </div>
    );
}