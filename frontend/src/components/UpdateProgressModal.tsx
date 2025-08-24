import { updateProgress } from "../api/progress";
import Progress from "../types/Progress";
import { Degree } from "../utils/ColorsForDegree";
import ProgressForm from "./ProgressForm";

type Props = {
    date: Date,
    progressToUpdate: Progress,
    closeModal: Function
};

export default function UpdateProgressModal(props: Props){
    const handleSubmit = async ({degree, description}: {degree: Degree, description: string}): Promise<void> => {
        try{
            await updateProgress({
                degree: degree,
                description: description,
                date: props.date,
                id: props.progressToUpdate.id
            });
            props.closeModal();

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
                />
            </div>
        </div>
    );
}