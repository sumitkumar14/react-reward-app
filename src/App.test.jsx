// App.test.jsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

jest.mock('./components/DashboardView', () => {
  const MockDashboard = () => <div>Mocked Dashboard</div>;
  MockDashboard.displayName = 'MockDashboard';
  return MockDashboard;
});

describe('App component', () => {
  test('renders DashboardView inside the App', () => {
    render(<App />);
    expect(screen.getByText(/Mocked Dashboard/i)).toBeInTheDocument();
  });
});
