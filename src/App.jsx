import React from 'react';
import DashboardView from './components/DashboardView';
import ErrorBoundary from './components/ErrorBoundary';

/**
 * Root application component that renders the customer rewards dashboard.
 *
 * Wraps the <DashboardView /> component with an ErrorBoundary to catch render-time errors.
 *
 * @component
 * @example
 * return (
 *   <App />
 * )
 */
function App() {
  return (
    <div style={{ padding: '1rem' }}>
      <ErrorBoundary>
        <DashboardView />
      </ErrorBoundary>
    </div>
  );
}

export default App;
