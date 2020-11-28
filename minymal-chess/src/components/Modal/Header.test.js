import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Header from './Header';

test('renders correctly', () => {
    const { getByText } = render(
        <Header
            onClose={null}
            header={'Test Header'}
        />
    );
    const element = getByText('Test Header');
    expect(element).toBeInTheDocument();
});

/*
test('click close button', () => {
    const { getByText } = render(
        <Header
            onClose={() => alert('Test Modal Header')}
            header={'Test Header'}
        />
    );
    const element = getByText('X');
    fireEvent.click(element);
    expect(screen.getByRole('alert')).toHaveTextContent('Oops, failed to fetch!');
});
*/
