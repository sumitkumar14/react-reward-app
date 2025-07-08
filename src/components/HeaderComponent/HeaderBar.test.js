import React from 'react';
import { render, screen } from '@testing-library/react';
import HeaderBar from './HeaderBar';

describe('HeaderBar', () => {
  test('renders the AppBar with title centered', () => {
    render(<HeaderBar />);

    // Check for the AppBar title
    const title = screen.getByText('Customer Rewards Dashboard');
    expect(title).toBeInTheDocument();

    // Optional: assert alignment styles indirectly (not exact styles, but flex structure)
    const box = title.parentElement;
    expect(box).toHaveStyle('justify-content: center');
  });
});
