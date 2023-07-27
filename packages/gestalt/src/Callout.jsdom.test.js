// @flow strict
import { render } from '@testing-library/react';
import Callout from './Callout.js';
import Text from './Text.js';

describe('Callout', () => {
  it('renders error variant', () => {
    const { container } = render(
      <Callout
        message="Insert a clever error callout message here"
        iconAccessibilityLabel="error"
        type="error"
      />,
    );
    expect(container).toMatchSnapshot();
  });

  it('renders warning variant', () => {
    const { container } = render(
      <Callout
        message="Insert a clever warning callout message here"
        iconAccessibilityLabel="warning"
        type="warning"
      />,
    );
    expect(container).toMatchSnapshot();
  });

  it('renders info variant', () => {
    const { container } = render(
      <Callout
        message="Insert a clever info callout message here"
        iconAccessibilityLabel="info"
        type="info"
      />,
    );
    expect(container).toMatchSnapshot();
  });

  it('renders message + title', () => {
    const { container } = render(
      <Callout
        message="Insert a clever info callout message here"
        iconAccessibilityLabel="info"
        type="info"
        title="A Title"
      />,
    );
    expect(container).toMatchSnapshot();
  });

  it('renders message + title + primaryAction with href', () => {
    const { container } = render(
      <Callout
        message="Insert a clever info callout message here"
        iconAccessibilityLabel="info"
        primaryAction={{ href: 'pinterest.com', label: 'Visit Pinterest', accessibilityLabel: '' }}
        type="info"
        title="A Title"
      />,
    );
    expect(container).toMatchSnapshot();
  });

  it('renders message + title + primaryAction without href', () => {
    const { container } = render(
      <Callout
        message="Insert a clever info callout message here"
        iconAccessibilityLabel="info"
        primaryAction={{ label: 'Visit Pinterest', accessibilityLabel: '' }}
        type="info"
        title="A Title"
      />,
    );
    expect(container).toMatchSnapshot();
  });

  it('renders message + title + primaryAction + secondaryAction', () => {
    const { container } = render(
      <Callout
        message="Insert a clever info callout message here"
        iconAccessibilityLabel="info"
        primaryAction={{ href: 'pinterest.com', label: 'Visit Pinterest', accessibilityLabel: '' }}
        secondaryAction={{
          href: 'pinterest.com/help',
          label: 'Learn more',
          accessibilityLabel: 'Learn more: callout messages',
        }}
        type="info"
        title="A Title"
      />,
    );
    expect(container).toMatchSnapshot();
  });

  it('renders message + title + primaryAction + dismissButton', () => {
    const { container } = render(
      <Callout
        message="Insert a clever info callout message here"
        iconAccessibilityLabel="info"
        primaryAction={{ href: 'pinterest.com', label: 'Visit Pinterest', accessibilityLabel: '' }}
        dismissButton={{
          accessibilityLabel: 'Dismiss banner',
          onDismiss: () => {},
        }}
        type="info"
        title="A Title"
      />,
    );
    expect(container).toMatchSnapshot();
  });

  it('renders rich text message', () => {
    const { container } = render(
      <Callout
        dismissButton={{
          accessibilityLabel: 'Dismiss this banner',
          onDismiss: () => {},
        }}
        iconAccessibilityLabel="Info"
        message={
          <Text inline>
            You have invited{' '}
            <Text inline weight="bold">
              Leaf Media Agency
            </Text>{' '}
            to your business hierarchy. Once they accept, you will be able to manage their business
            account.
          </Text>
        }
        primaryAction={{
          accessibilityLabel: 'Resend invite',
          label: 'Resend invite',
        }}
        secondaryAction={{
          accessibilityLabel: 'Cancel invite',
          label: 'Cancel invite',
        }}
        title="You've sent an invite"
        type="info"
      />,
    );
    expect(container).toMatchSnapshot();
  });
  it('handles onDismiss callback', () => {
    const mockOnDismiss = jest.fn<[], void>();
    const { getByLabelText } = render(
      <Callout
        message="Insert a clever error callout message here"
        dismissButton={{
          accessibilityLabel: 'Dismiss banner',
          onDismiss: mockOnDismiss,
        }}
        iconAccessibilityLabel="error"
        type="error"
      />,
    );
    // eslint-disable-next-line testing-library/prefer-screen-queries -- Please fix the next time this file is touched!
    getByLabelText('Dismiss banner').click();
    expect(mockOnDismiss).toHaveBeenCalled();
  });
});
