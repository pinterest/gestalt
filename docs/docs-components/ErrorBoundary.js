// @flow strict

import React, { type Node as ReactNode } from 'react';
import { Button, Text } from 'gestalt';

class ErrorBoundary extends React.Component<{ children: ReactNode }, { hasError: boolean }> {
  state: { hasError: boolean } = { hasError: false };

  static getDerivedStateFromError(): { hasError: boolean } {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: { componentStack: string, ... }) {
    // You can use your own error logging service here
    // eslint-disable-next-line no-console
    console.log({ error, errorInfo });
  }

  render(): ReactNode {
    // Check if the error is thrown
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div>
          <Text>
            <h4>Oops, sorry, something went wrong with showing this page!</h4>
          </Text>
          <Button
            color="gray"
            onClick={() => this.setState({ hasError: false })}
            size="sm"
            text="Try again?"
          />
        </div>
      );
    }

    // Return children components in case of no error

    return this.props.children;
  }
}

export default ErrorBoundary;
