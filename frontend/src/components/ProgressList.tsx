import Progress from "../types/Progress";
import { getIconForDegree } from "../utils/iconsForDegree";

type Props = {
    progresses: Progress[];
    selected: Date | null;
    startUpdate: Function,
    startDelete: Function
};

export default function ProgressList(props: Props){
    const progressListItems: React.ReactElement[] = props.progresses.map((p: Progress) => {
        return (
            <ProgressListItem
                progress={p}
                handleClick={props.startUpdate}
            />
        );
    });

    return (
        <div className="w-full">
            {props.progresses.length > 0? progressListItems: <div className="text-center">empty</div>}
        </div>
    );
}

function ProgressListItem({progress, handleClick}: {progress: Progress, handleClick: Function}){
    return (
        <div
            key={progress.id}
            className="flex w-full border rounded p-2 m-2 items-center cursor-pointer"
            onClick={(e) => {
                handleClick(progress);
            }}
        >
            <img src={getIconForDegree(progress.degree)}
                className="w-8 h-8 border rounded-full p-1 m-2"
            />
            <div
                className="align-middle "
            >
                {progress.description}
            </div>
        </div>
    );
}
