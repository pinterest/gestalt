import { create } from 'react-test-renderer';
import BannerCallout from './BannerCallout';
import Text from './Text';

describe('<BannerCallout />', () => {
  test('Error BannerCallout', () => {
    const tree = create(
      <BannerCallout
        iconAccessibilityLabel="error"
        message="Insert a clever error bannercallout message here"
        type="error"
      />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('Warning BannerCallout', () => {
    const tree = create(
      <BannerCallout
        iconAccessibilityLabel="warning"
        message="Insert a clever warning bannercallout message here"
        type="warning"
      />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('Info BannerCallout', () => {
    const tree = create(
      <BannerCallout
        iconAccessibilityLabel="info"
        message="Insert a clever info bannercallout message here"
        type="info"
      />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('message + title', () => {
    const tree = create(
      <BannerCallout
        iconAccessibilityLabel="info"
        message="Insert a clever info bannercallout message here"
        title="A Title"
        type="info"
      />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('message + title + primaryAction with href', () => {
    const tree = create(
      <BannerCallout
        iconAccessibilityLabel="info"
        message="Insert a clever info bannercallout message here"
        primaryAction={{
          href: 'pinterest.com',
          label: 'Visit Pinterest',
          accessibilityLabel: '',
          role: 'link',
        }}
        title="A Title"
        type="info"
      />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('message + title + primaryAction without href', () => {
    const tree = create(
      <BannerCallout
        iconAccessibilityLabel="info"
        message="Insert a clever info bannercallout message here"
        primaryAction={{ label: 'Visit Pinterest', accessibilityLabel: '', role: 'button' }}
        title="A Title"
        type="info"
      />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('message + title + primaryAction + secondaryAction', () => {
    const tree = create(
      <BannerCallout
        iconAccessibilityLabel="info"
        message="Insert a clever info bannercallout message here"
        primaryAction={{
          href: 'pinterest.com',
          label: 'Visit Pinterest',
          accessibilityLabel: '',
          role: 'link',
        }}
        secondaryAction={{
          href: 'pinterest.com/help',
          label: 'Learn more',
          accessibilityLabel: 'Learn more: bannercallout messages',
          role: 'link',
        }}
        title="A Title"
        type="info"
      />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('message + title + primaryAction + dismissButton', () => {
    const tree = create(
      <BannerCallout
        dismissButton={{
          accessibilityLabel: 'Dismiss banner',
          onDismiss: () => {},
        }}
        iconAccessibilityLabel="info"
        message="Insert a clever info bannercallout message here"
        primaryAction={{
          href: 'pinterest.com',
          label: 'Visit Pinterest',
          accessibilityLabel: '',
          role: 'link',
        }}
        title="A Title"
        type="info"
      />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('bannercallout with rich text message', () => {
    const tree = create(
      <BannerCallout
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
          role: 'button',
        }}
        secondaryAction={{
          accessibilityLabel: 'Cancel invite',
          label: 'Cancel invite',
          role: 'button',
        }}
        title="You've sent an invite"
        type="info"
      />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
