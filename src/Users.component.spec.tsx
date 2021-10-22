import React from 'react';
import {render, screen} from '@testing-library/react';
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
