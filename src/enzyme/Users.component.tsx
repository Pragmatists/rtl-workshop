import {useState} from 'react';
import axios from 'axios';
import {Users} from "./Users";

export const UsersComponent = () => {
    const [users, setUsers] = useState<User[]>([]);

    async function loadUsers() {
        const response = await axios.get<User[]>('/users/')
        setUsers(response.data)
    }

    function handleDeleteUser(id: number) {
        setTimeout(() => setUsers(prevUsers => prevUsers.filter(user => user.id !== id)), 500);
    }

    return (
        <div>
            <div className="users">
                <header>Users</header>
            </div>
            <div>
                <button onClick={loadUsers}>Załaduj</button>
            </div>
            <Users users={users} onDelete={handleDeleteUser}/>
        </div>
    );
}

export interface User {
    id: number
    name: string
    surname: string
}

