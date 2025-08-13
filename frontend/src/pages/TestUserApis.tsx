import axios from "axios";
import { useEffect, useState } from "react";

type User = {
    id: number;
    name: string;
    email: string;
};

function TestUserApis(){
    const [users, setUsers] = useState<User[]>([]);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:3000/user', { name, email });
            alert('ユーザー作成成功');
            setName('');
            setEmail('');
        } catch (error) {
            console.error(error);
            alert('ユーザー作成に失敗しました');
        }
    };  

    useEffect(() => {
        axios.get("http://localhost:3000/user")
        .then(res => setUsers(res.data))
        .catch(err => console.error(err));
    }, []);

    return (
        <div>
            <ul>
                {users.map(u => <li key={u.id}>{u.name}({u.email})</li>)}
            </ul>
            <form onSubmit={handleSubmit}>
                <input 
                    value={name} 
                    onChange={e => setName(e.target.value)} 
                    placeholder="名前" 
                    required 
                />
                <input 
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="メール" 
                    type="email"
                    required 
                />
                <button type="submit">作成</button>
            </form>
        </div>
    );
}

export default TestUserApis;