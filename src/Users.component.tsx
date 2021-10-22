import {useState} from 'react';
import axios from 'axios';

export const Users = () => {

    const [users, setUsers] = useState<User[]>([]);

    function loadUsers() {
        axios.get<User[]>('/users/')
            .then(response => {
                setUsers(response.data);
            })
            .catch((e) => {
                console.log(e);
            })
    }

    return (
        <div>
            <div className="users">
                <header>Users</header>
            </div>
            <div>
                <button onClick={loadUsers}>Załaduj</button>
            </div>
            <div>
                <label id="users">Użytkownicy</label>
                <table aria-labelledby="users">
                    <tbody>
                        {
                            users.map(user =>
                                (
                                    <tr key={user.id}>
                                        <td>{user.name}</td>
                                        <td>{user.surname}</td>
                                    </tr>
                                ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
}

interface User {
    id: number
    name: string
    surname: string
}

