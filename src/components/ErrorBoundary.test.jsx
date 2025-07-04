import React from 'react';
import { render, screen } from '@testing-library/react';
import ErrorBoundary from './ErrorBoundary';

// Simulated child component that throws
const ProblemChild = () => {
  throw new Error('Boom!');
};

describe('ErrorBoundary', () => {
  test('renders fallback UI on error', () => {
    // Suppress console.error in test output
    jest.spyOn(console, 'error').mockImplementation(() => {});

    render(
      <ErrorBoundary>
        <ProblemChild />
      </ErrorBoundary>
    );

    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();

    expect(screen.getByText(/Boom!/)).toBeInTheDocument();

    // Restore console.error
    console.error.mockRestore();
  });
});
