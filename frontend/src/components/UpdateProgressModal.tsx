import { useState } from "react";
import { updateProgress, deleteProgress } from "../api/progress";
import Progress from "../types/Progress";
import { Degree } from "../utils/colorsForDegree";
import ProgressForm from "./ProgressForm";
import trashIcon from "../assets/trash_icon.png";

type Props = {
    progressToUpdate: Progress;
    onUpdate: Function;
    onClose: Function;
    onDelete: Function;
};

export default function UpdateProgressModal(props: Props){
    const [confirmingDelete, setConfirmingDelete] = useState<boolean>(false);

    const handleSubmit = async ({degree, description}: {degree: Degree, description: string}): Promise<void> => {
        try{
            const updated: Progress = await updateProgress({
                degree: degree,
                description: description,
                date: props.progressToUpdate.date,
                id: props.progressToUpdate.id
            });

            props.onUpdate(updated);
        }catch(err){
            console.error(err);
        }
    };

    const handleDelete = async (): Promise<void> => {
        try{
            const deleted: Progress = await deleteProgress(props.progressToUpdate.id);

            props.onDelete(deleted);
        }catch(err){
            console.error(err);
        }
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/10">
            <div className="md:w-1/2 bg-white p-6 rounded-lg shadow-lg">
                <ProgressForm
                    handleSubmit={handleSubmit}
                    selectedDate={props.progressToUpdate.date}
                    currentProgress={props.progressToUpdate}
                    onClose={props.onClose}
                    submitText="Update"
                />
                <div className="bottom-4 right-2 text-right">
                    <div>
                        { confirmingDelete && (
                            <div className="text-red-500 size-sm">
                                Are you sure to delete this?
                            </div>
                        )}
                        <button
                            onClick={(e) => {
                                if(!confirmingDelete){
                                    setConfirmingDelete(true);
                                    return;
                                }
                                handleDelete();
                            }}
                            className="w-6 h-6 p-1 rounded-full bg-red-500">
                            <img src={trashIcon}></img>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}