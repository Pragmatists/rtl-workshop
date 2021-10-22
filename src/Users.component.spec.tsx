import React from 'react';
import {fireEvent, render, screen, within} from '@testing-library/react';
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

    const tableRows = await screen.findAllByRole('row');
    expect(tableRows).toHaveLength(3);
    expect(within(tableRows[0]).getAllByRole('cell')[0]).toHaveTextContent('Jan');
    expect(within(tableRows[1]).getAllByRole('cell')[0]).toHaveTextContent('Piotr');
    expect(within(tableRows[2]).getAllByRole('cell')[0]).toHaveTextContent('Stefan');
});