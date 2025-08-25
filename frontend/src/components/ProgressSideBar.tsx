import { useState } from "react";
import ProgressList from "./ProgressList";
import Progress from "../types/Progress";
import CreateProgressModal from "./CreateProgressModal";
import UpdateProgressModal from "./UpdateProgressModal";

type Props = {
    progresses: Progress[];
    selected: Date | null;
    onCreate: Function;
    onUpdate: Function;
};

type ModalState = 'create' | 'update' | 'delete' | null;

export default function ProgressSideBar(props: Props){
    const [modalState, setModalState] = useState<ModalState>(null);
    const [targetProgress, setTargetProgress] = useState<Progress | null>(null);

    const selected = props.selected;
    const closeModal = () => {
        setModalState(null);
        setTargetProgress(null);
    };

    const onCreate = (progress: Progress) => {
        closeModal();
        props.onCreate(progress);
    };

    const startUpdate = (progress: Progress) => {
        setModalState('update');
        setTargetProgress(progress);
    };
    const onUpdate = (progress: Progress) => {
        closeModal();
        props.onUpdate(progress);
    };

    const startDelete = (progress: Progress) => {
        setModalState('delete');
        setTargetProgress(progress);
    };

    if(!selected){
        return <p className="text-center">Select a date.</p>;
    }

    return (
    <div
        className="flex flex-col content-center flex-wrap"
    >
        {(modalState === 'create' && props.selected) && (
            <CreateProgressModal
                date={props.selected}
                onCreate={onCreate}
                onClose={closeModal}
            />
        )}
        {(modalState === 'update' && props.selected && targetProgress) && (
            <UpdateProgressModal
                date={props.selected}
                onUpdate={onUpdate}
                progressToUpdate={targetProgress}
                onClose={closeModal}
            />
        )}
        <div className="w-full">
            <ProgressList
                progresses={props.progresses}
                selected={props.selected}
                startUpdate={startUpdate}
                startDelete={startDelete}
            />
            <div className="text-center">
                <button
                    className="relative mt-4 w-12 h-12 rounded-full border shadow-sm text-lg text-gray-500"
                    onClick={() => {setModalState('create')}}
                >
                    <div className="absolute h-4 w-0 border border-gray-400 m-auto top-0 right-0 left-0 bottom-0">
                    </div>
                    <div className="absolute h-0 w-4 border border-gray-400 m-auto top-0 right-0 left-0 bottom-0">
                    </div>
                </button>
            </div>
        </div>
    </div>
    )
}