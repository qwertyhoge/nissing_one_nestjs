import Progress from "../types/Progress";

type Props = {
    progresses: Progress[];
    selected: Date | null;
};

export default function ProgressList(props: Props){
    const progressListItems: React.ReactElement[] = props.progresses.map((p: Progress) => {
        return (
            <ProgressListItem progress={p}/>
        );
    });

    return (
        <div className="w-fit">
            {props.progresses.length > 0? progressListItems: "empty"}
        </div>
    );
}

function ProgressListItem({progress}: {progress: Progress}){
    return (
        <div
            key={progress.id}
        >
            <div>
                
            </div>
            {progress.description}
        </div>
    );
}
