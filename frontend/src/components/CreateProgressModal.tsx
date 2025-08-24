import { createProgress } from "../api/progress";
import { Degree } from "../utils/ColorsForDegree";
import ProgressForm from "./ProgressForm";
import Progress from "../types/Progress";

type Props = {
    date: Date,
    onCreate: Function
};

export default function CreateProgressModal(props: Props){
    const handleSubmit = async ({degree, description}: {degree: Degree, description: string}): Promise<void> => {
        try{
            const created: Progress = await createProgress({
                degree: degree,
                description: description,
                date: props.date
            });
            console.log(created);

            props.onCreate(created);
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
                />
            </div>
        </div>
    );
}