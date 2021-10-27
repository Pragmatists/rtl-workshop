import {User} from "./Users.component";
import {UserComponent} from "./User";

interface Props {
    users: User[]
    onDelete: (id: number) => void
}

export const Users = (props: Props) => {
    return (
        <div>
            <label id="users">Użytkownicy</label>
            <table aria-labelledby="users">
                <tbody>
                {
                    props.users.map(user => (
                        <UserComponent key={user.id} user={user} onDelete={props.onDelete}/>
                    ))
                }
                </tbody>
            </table>
        </div>
    );
}
