import './App.css';
import { useState, useEffect } from 'react';
import Progress from './types/Progress';
import { getProgresses } from './api/progress';
import { formatDateLocal } from './utils/date';
import ProgressCalendar from './components/ProgressCalendar';
import ProgressSideBar from './components/ProgressSideBar';

function App() {
    const [selected, setSelected] = useState<Date | null>(null);
    const [progresses, setProgresses] = useState<Progress[]>([]);


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
    
    const progressesForDate = new Map<string, Progress[]>();

    progresses.map((p: Progress) => {
        const d: string = formatDateLocal(p.date);
        if(progressesForDate.has(d)){
            progressesForDate.get(d)?.push(p);
        }else{
            progressesForDate.set(d, [p]);
        }
    });

    const selectedProgresses: Progress[] = selected? progressesForDate.get(formatDateLocal(selected))?? []: [];

    const onCreate = (newProgress: Progress) => {
        setProgresses([...progresses, newProgress]);
    };
    const onUpdate = (updatedProgress: Progress) => {
        setProgresses(
            progresses.map((p) => {
                if(p.id == updatedProgress.id){
                    return updatedProgress;
                }
                return p;
            })
        );
    }

    return (
        <div className='flex flex-col md:flex-row h-screen'>
            <div className='h-fit flex flex-1 p-4 justify-center'>
                <ProgressCalendar
                    selected={selected}
                    setSelected={setSelected}
                    progressesForDate={progressesForDate}
                />
            </div>
            <div className='w-full md:w-1/3 p-4 border-l overflow-y-scroll'>
                <ProgressSideBar
                    progresses={selectedProgresses}
                    selected={selected}
                    onCreate={onCreate}
                    onUpdate={onUpdate}
                />
            </div>
        </div>
    );
}

export default App;
