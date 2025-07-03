// App.test.jsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

// Optionally mock DashboardView if it's complex
jest.mock('./DashboardView', () => () => <div>Mocked Dashboard</div>);

describe('App component', () => {
  test('renders DashboardView inside the App', () => {
    render(<App />);
    expect(screen.getByText(/Mocked Dashboard/i)).toBeInTheDocument();
  });
});
