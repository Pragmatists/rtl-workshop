import {User} from "./Users.component";

interface UserProps {
    user: User
    onDelete: (id: number) => void
}

export const UserComponent = (props: UserProps) => {
    return (
        <tr key={props.user.id}>
            <td data-test={'user-name'}>{props.user.name}</td>
            <td data-test={'user-surname'}>{props.user.surname}</td>
            <td>
                <button data-test={'delete-user'} onClick={() => props.onDelete(props.user.id)}>delete</button>
            </td>
        </tr>
    );
}
