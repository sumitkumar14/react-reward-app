import React from 'react';
import DashboardView from './components/DashboardView';

/**
 * Root application component that renders the customer rewards dashboard.
 *
 * Wraps the <DashboardView /> component, applying global layout styling.
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
      <DashboardView />
    </div>
  );
}

export default App;
