import React from 'react';
import {fireEvent, render, screen, within} from '@testing-library/react';
import {Users} from 'Users.component';

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

test('show users', () => {
    render(<Users/>);

    const firstRow = screen.getAllByRole('row')[1];
    const secondRow = screen.getAllByRole('row')[2];
    expect(within(firstRow).getAllByRole('cell')[0]).toHaveTextContent('Jan');
    expect(within(firstRow).getAllByRole('cell')[1]).toHaveTextContent('Kowalski');
    expect(within(secondRow).getAllByRole('cell')[0]).toHaveTextContent('Piotr');
    expect(within(secondRow).getAllByRole('cell')[1]).toHaveTextContent('Nowak');
});
