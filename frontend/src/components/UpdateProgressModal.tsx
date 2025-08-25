import { updateProgress } from "../api/progress";
import Progress from "../types/Progress";
import { Degree } from "../utils/colorsForDegree";
import ProgressForm from "./ProgressForm";

type Props = {
    date: Date;
    progressToUpdate: Progress;
    onUpdate: Function;
    onClose: Function;
};

export default function UpdateProgressModal(props: Props){
    const handleSubmit = async ({degree, description}: {degree: Degree, description: string}): Promise<void> => {
        try{
            const updated: Progress = await updateProgress({
                degree: degree,
                description: description,
                date: props.date,
                id: props.progressToUpdate.id
            });

            props.onUpdate(updated);
        }catch(err){
            console.error(err);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/10">
            <div className="md:w-1/2 bg-white p-6 rounded-lg shadow-lg">
                <ProgressForm
                    handleSubmit={handleSubmit}
                    selectedDate={props.date}
                    currentProgress={props.progressToUpdate}
                    onClose={props.onClose}
                />
            </div>
        </div>
    );
}