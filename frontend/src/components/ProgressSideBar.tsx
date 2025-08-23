import { useState } from "react";
import ProgressList from "./ProgressList";
import Progress from "../types/Progress";
import CreateProgressModal from "./CreateProgressModal";

type Props = {
    progresses: Progress[];
    selected: Date | null;
};

export default function ProgressSideBar(props: Props){
    const [modalState, setModalState] = useState<
        {type: 'create', date: Date} |
        null
    >(null);

    const selected = props.selected;

    if(!selected){
        return <p className="text-center">Select a date.</p>;
    }

    return (
    <div
        className="flex flex-col content-center flex-wrap"
    >
        {(modalState?.type === 'create' && props.selected) && (
            <CreateProgressModal
                date={props.selected}
            />
        )}
        <div>
            <ProgressList
                progresses={props.progresses}
                selected={props.selected}
            />
            <button
                className="relative mt-4 w-12 h-12 rounded-full border shadow-sm text-lg text-gray-500"
                onClick={() => {setModalState({
                    type: 'create',
                    date: selected
                })}}
            >
                <div className="absolute h-4 w-0 border border-gray-400 m-auto top-0 right-0 left-0 bottom-0">
                </div>
                <div className="absolute h-0 w-4 border border-gray-400 m-auto top-0 right-0 left-0 bottom-0">
                </div>
            </button>
        </div>
    </div>
    )
}