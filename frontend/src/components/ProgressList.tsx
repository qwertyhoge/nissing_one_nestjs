import Progress from "../types/Progress";

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
        <div className="w-fit">
            {props.progresses.length > 0? progressListItems: "empty"}
        </div>
    );
}

function ProgressListItem({progress, handleClick}: {progress: Progress, handleClick: Function}){
    return (
        <div
            key={progress.id}
            className="cursor-pointer"
            onClick={(e) => {
                handleClick(progress);
            }}
        >
            <div>
                {progress.description}
            </div>
        </div>
    );
}
