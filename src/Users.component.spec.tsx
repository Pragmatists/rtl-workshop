import React from 'react';
import {fireEvent, render, screen, waitFor, waitForElementToBeRemoved, within} from '@testing-library/react';
import {Users} from 'Users.component';
import nock from 'nock';

const httpMock = nock('http://localhost');

test('show header', () => {
    render(<Users/>);

    const headerElement = screen.getByText(/users/i);

    expect(headerElement).toBeInTheDocument();
});

test('show load button', () => {
    render(<Users/>);

    const loadButton = screen.getByRole('button', {name: /załaduj/i});

    expect(loadButton).toBeInTheDocument();
});

test('load users after click', async () => {
    httpMock.get('/users/').reply(200,[
        {id: '1', name: 'Jan', surname: 'Kowalski'},
        {id: '2', name: 'Piotr', surname: 'Nowak'},
        {id: '3', name: 'Stefan', surname: 'Wyczesany'},
    ]);
    render(<Users/>);

    fireEvent.click(screen.getByRole('button', {name: /załaduj/i}));

    const rows = await within(await screen.findByLabelText('Użytkownicy')).findAllByRole('row');
    expect(rows).toHaveLength(3);
    expect(within(rows[0]).getAllByRole('cell')[0]).toHaveTextContent('Jan');
    expect(within(rows[1]).getAllByRole('cell')[0]).toHaveTextContent('Piotr');
    expect(within(rows[2]).getAllByRole('cell')[0]).toHaveTextContent('Stefan');
});

test('load users after click - wait for version', async () => {
    httpMock.get('/users/').reply(200,[
        {id: '1', name: 'Jan', surname: 'Kowalski'},
        {id: '2', name: 'Piotr', surname: 'Nowak'},
        {id: '3', name: 'Stefan', surname: 'Wyczesany'},
    ]);
    render(<Users/>);

    fireEvent.click(screen.getByRole('button', {name: /załaduj/i}));

    await waitFor(() => {
        const table = screen.getByLabelText('Użytkownicy')
        const rows = within(table).getAllByRole('row');
        expect(rows).toHaveLength(3);
        expect(within(rows[0]).getAllByRole('cell')[0]).toHaveTextContent('Jan');
        expect(within(rows[1]).getAllByRole('cell')[0]).toHaveTextContent('Piotr');
        expect(within(rows[2]).getAllByRole('cell')[0]).toHaveTextContent('Stefan');
    });
});

test('remove user', async () => {
    httpMock.get('/users/').reply(200,[
        {id: '1', name: 'Jan', surname: 'Kowalski'},
        {id: '2', name: 'Piotr', surname: 'Nowak'},
    ]);
    render(<Users/>);
    fireEvent.click(screen.getByRole('button', {name: /załaduj/i}));
    await waitFor(() => {
        const table = screen.getByLabelText('Użytkownicy');
        expect(within(table).getAllByRole('row')).toHaveLength(2);
    });

    const table = screen.getByLabelText('Użytkownicy');
    const row = within(table).getAllByRole('row');
    fireEvent.click(within(row[0]).getByRole('button', {name: /delete/i}));

    await waitForElementToBeRemoved(() => screen.queryByText('Kowalski'));
});

test('label by for input', () => {
    render(<Users/>);

    const input = screen.getByLabelText(/Nazwa użytkownika/i);

    expect(input).toBeInTheDocument();
});