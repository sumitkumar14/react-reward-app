import React from 'react';

/**
 * Catches errors in child components and displays fallback UI.
 *
 * @component
 * @param {React.ReactNode} children - Components to protect with the boundary
 */
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }; // Update state for fallback render
  }

  componentDidCatch(error, info) {
    // Log error details
    console.error('[ErrorBoundary] Caught error:', error);
    console.error('[ErrorBoundary] Stack trace:', info?.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '2rem', color: 'crimson' }}>
          <h2>💥 Something went wrong while rendering the app.</h2>
          <p>{this.state.error?.message}</p>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
