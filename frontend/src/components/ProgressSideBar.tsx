import ProgressList from "./ProgressList";
import Progress from "../types/Progress";

type Props = {
    progresses: Progress[];
    selected: Date | null;
};

export default function ProgressSideBar(props: Props){
    return (
    <div
        className="flex flex-col content-center flex-wrap"
    >
        {props.selected ? (
            <div>
                <ProgressList
                    progresses={props.progresses}
                    selected={props.selected}
                />
                <button
                    className="relative mt-4 w-12 h-12 rounded-full border shadow-sm text-lg text-gray-500"
                >
                    <div className="absolute h-4 w-0 border border-gray-400 m-auto top-0 right-0 left-0 bottom-0">
                    </div>
                    <div className="absolute h-0 w-4 border border-gray-400 m-auto top-0 right-0 left-0 bottom-0">
                    </div>
                </button>
            </div>
        ):
        <p className="text-center">Select a date.</p>}
    </div>
    )
}