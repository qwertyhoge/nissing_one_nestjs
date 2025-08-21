import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import { Progress, getProgresses, createProgress } from "../api/progress";
import "react-calendar/dist/Calendar.css";

export default function ProgressCalendar(){
    const [progresses, setProgresses] = useState<Progress[]>([]);
    const [selected, setSelected] = useState<Date | null>(null);
    const progressesForDate = new Map<string, Progress[] | null>();

    const colorsForDegree: Record<number, string> = {
        0: "#e8e8e8ff",
        1: "#a4ceecff",
        2: "#98ec9bff",
        3: "#ffbeb3ff"
    };

    const formatDate = (date: Date): string => {
        return date.toISOString().split('T')[0];
    }

    useEffect(() => {
        const fetchData = async () => {
            try{
                const fetchedProgresses = await getProgresses();
                setProgresses(fetchedProgresses);
            }catch(err){
                console.error("データ取得エラー: ", err);
            }
        }
        fetchData();
    }, []);

    progresses.map((p: Progress) => {
        console.log(p);
        const d: string = formatDate(p.date);
        if(progressesForDate.has(d)){
            progressesForDate.get(d)?.push(p);
        }else{
            progressesForDate.set(d, [p]);
        }
    });

    return (
        <Calendar
            onClickDay={(date: Date) => setSelected(date)}
            tileContent={({date, view}: {date: Date, view: string}) => {
                if(view !== "month"){
                    return null;
                }

                return(
                    <div className="flex justify-center">
                        {
                            progressesForDate.get(formatDate(date))?.map((progress) => {
                                return <div style={{color: colorsForDegree[progress.degree]}}>{progress.id}</div>
                            })
                        }
                    </div>
                )

            }}
        />
    )
}