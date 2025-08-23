import { useState } from "react";
import { Degree } from "../utils/ColorsForDegree";
import { createProgress } from "../api/progress";
import Progress from "../types/Progress";

type Props = {
    date: Date
};

export default function CreateProgressModal(props: Props){
    const [degree, setDegree] = useState<Degree>(0);
    const [description, setDescription] = useState<string>("");

    const handleSubmit = async () => {
        try{
            await createProgress({
                degree: degree,
                description: description,
                date: props.date
            });

        }catch(err){
            console.error(err);
        }
    };


    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/10">
            <div className="md:w-1/2 bg-white p-6 rounded-lg shadow-lg">
                <form onSubmit={handleSubmit}>
                    <div className="flex justify-center text-center">
                        <div className="w-1/3 cursor-pointer" onClick={() => setDegree(1)}>
                            1
                        </div>
                        <div className="w-1/3 cursor-pointer" onClick={() => setDegree(2)}>
                            2
                        </div>
                        <div className="w-1/3 cursor-pointer" onClick={() => setDegree(3)}>
                            3
                        </div>
                    </div>
                    <textarea className="w-full" onChange={(e) => {setDescription(e.target.value)}}>{description}</textarea>
                    <button type="submit">
                        a
                    </button>
                </form>
            </div>
        </div>
    );
}