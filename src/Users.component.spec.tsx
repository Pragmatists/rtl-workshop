import React from 'react';
import {render, screen} from '@testing-library/react';
import {Users} from 'Users.component';

test('show header', () => {
    render(<Users/>);

    const headerElement = screen.getByText('Users');

    expect(headerElement).toBeInTheDocument();
});
