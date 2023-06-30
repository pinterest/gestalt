// @flow strict
import { create } from 'react-test-renderer';
import Callout from './Callout.js';
import Text from './Text.js';

describe('<Callout />', () => {
  test('Error Callout', () => {
    const tree = create(
      <Callout
        message="Insert a clever error callout message here"
        iconAccessibilityLabel="error"
        type="error"
      />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('Warning Callout', () => {
    const tree = create(
      <Callout
        message="Insert a clever warning callout message here"
        iconAccessibilityLabel="warning"
        type="warning"
      />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('Info Callout', () => {
    const tree = create(
      <Callout
        message="Insert a clever info callout message here"
        iconAccessibilityLabel="info"
        type="info"
      />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('message + title', () => {
    const tree = create(
      <Callout
        message="Insert a clever info callout message here"
        iconAccessibilityLabel="info"
        type="info"
        title="A Title"
      />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('message + title + primaryAction with href', () => {
    const tree = create(
      <Callout
        message="Insert a clever info callout message here"
        iconAccessibilityLabel="info"
        primaryAction={{ href: 'pinterest.com', label: 'Visit Pinterest', accessibilityLabel: '' }}
        type="info"
        title="A Title"
      />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('message + title + primaryAction without href', () => {
    const tree = create(
      <Callout
        message="Insert a clever info callout message here"
        iconAccessibilityLabel="info"
        primaryAction={{ label: 'Visit Pinterest', accessibilityLabel: '' }}
        type="info"
        title="A Title"
      />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('message + title + primaryAction + secondaryAction', () => {
    const tree = create(
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
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('message + title + primaryAction + dismissButton', () => {
    const tree = create(
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
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('callout with rich text message', () => {
    const tree = create(
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
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
