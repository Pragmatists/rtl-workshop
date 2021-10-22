
export const Users = () => {
    return (
        <div>
            <div className="users">
                <header>Users</header>
            </div>
            <div>
                <button>Załaduj</button>
            </div>
            <div>
                <label id="users">Użytkownicy</label>
                <table aria-labelledby="users">
                    <thead>
                        <tr>
                            <th>Imię</th>
                            <th>Nazwisko</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Jan</td>
                            <td>Kowalski</td>
                        </tr>
                        <tr>
                            <td>Piotr</td>
                            <td>Nowak</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

