import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import Progress from "../types/Progress";
import "react-calendar/dist/Calendar.css";
import { formatDateLocal } from "../utils/date";
import { getColorForDegree } from "../utils/ColorsForDegree";

type Props = {
    selected: Date | null;
    setSelected: Function;
    progressesForDate: Map<string, Progress[]>;
};

export default function ProgressCalendar(props: Props){
    return (
        <Calendar
            className="w-auto"
            onClickDay={(date: Date) => props.setSelected(date)}
            tileContent={({date, view}: {date: Date, view: string}) => {
                if(view !== "month"){
                    return null;
                }

                return(
                    <div className="flex justify-center">
                        {
                            props.progressesForDate.get(formatDateLocal(date))?.map((progress) => {
                                console.log(date);
                                console.log(formatDateLocal(date));

                                return <div
                                    key={progress.id}
                                    style={{backgroundColor: getColorForDegree(progress.degree)}}
                                    className="w-1 h-1 rounded-full"
                                >
                                </div>
                            })
                        }
                    </div>
                )

            }}
        />
    )
}