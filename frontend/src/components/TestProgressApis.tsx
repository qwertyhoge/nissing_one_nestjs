import axios from "axios";
import { useEffect, useState } from "react";

type Progress = {
    id: number;
    date: Date;
    degree: number;
    description: string;
};

function TestProgressApis(){
    const [progresses, setProgresses] = useState<Progress[]>([]);
    const [date, setDate] = useState(new Date());
    const [degree, setDegree] = useState(0);
    const [description, setDescription] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:3000/progress', { degree, description, date });
            alert('ユーザー作成成功');
            setDate(new Date());
            setDegree(0);
            setDescription('');
        } catch (error) {
            console.error(error);
            alert('ユーザー作成に失敗しました');
        }
    };  

    useEffect(() => {
        axios.get("http://localhost:3000/progress")
        .then(res => setProgresses(res.data))
        .catch(err => console.error(err));
    }, []);

    const formatDate = (date: Date): string => {
        const year: string = date.getFullYear().toString();

        const zeroPaddedNum = (num: number): string => {
            if(num >= 10){
                return num.toString();
            }
            return `0${num}`;
        }
        
        const month: string = zeroPaddedNum(date.getMonth() + 1);
        const dateOfMonth: string = zeroPaddedNum(date.getDate());

        return `${year}-${month}-${dateOfMonth}`;
    };
    const formattedDate: string = formatDate(date);

    return (
        <div>
            <ul>
                {progresses.map(p => <li key={p.id}>{p.description}({p.degree}, {formatDate(new Date(p.date))})</li>)}
            </ul>
            <form onSubmit={handleSubmit}>
                <input
                    value={formattedDate}
                    onChange={e => setDate(new Date(e.target.value))}
                    type="date" 
                    name="date"
                    required 
                >
                </input>
                <input 
                    value={description} 
                    onChange={e => setDescription(e.target.value)} 
                    placeholder="説明"
                    name="description" 
                    required 
                />
                <div>
                    <input 
                        value={1}
                        onClick={() => setDegree(1)}
                        name="degree"
                        id="degree-1"
                        type="radio"
                        required 
                    />
                    <label htmlFor="degree-1">1</label>
                    <input 
                        value={2}
                        onClick={() => setDegree(2)}
                        name="degree"
                        id="degree-2"
                        type="radio"
                        required 
                    />
                    <label htmlFor="degree-2">2</label>
                    <input 
                        value={3}
                        onClick={() => setDegree(3)}
                        name="degree"
                        id="degree-3"
                        type="radio"
                        required 
                    />
                    <label htmlFor="degree-3">3</label>
                </div>
                <button type="submit">作成</button>
            </form>
        </div>
    );
}

export default TestProgressApis;