import React from 'react';
import { render } from '@testing-library/react';
import Header from './Header';

test('renders correctly', () => {
    const { getByText } = render(
        <Header
            onClose={null}
            header={'Test Header'}
        />
    );
    const headerElement = getByText('Test Header');
    expect(headerElement).toBeInTheDocument();
});
