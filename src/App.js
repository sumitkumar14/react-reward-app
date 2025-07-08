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

import React from 'react';
import DashboardView from './components/DashboardComponent/DashboardView';
import ErrorBoundary from './components/ErrorBoundaryComponent/ErrorBoundary';

function App() {
  return (
    <div>
      <ErrorBoundary>
        <DashboardView />
      </ErrorBoundary>
    </div>
  );
}

export default App;
