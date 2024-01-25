// @flow strict
import { create } from 'react-test-renderer';
import BannerUpsell from './BannerUpsell';
import Icon from './Icon';
import TextField from './TextField';

describe('<BannerUpsell />', () => {
  test('Basic BannerUpsell', () => {
    const tree = create(<BannerUpsell message="Insert a clever upsell message here" />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('message + title', () => {
    const tree = create(
      <BannerUpsell message="Insert a clever upsell message here" title="A Title" />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('message + title + primaryAction with href', () => {
    const tree = create(
      <BannerUpsell
        message="Insert a clever upsell message here"
        primaryAction={{
          href: 'pinterest.com',
          label: 'Visit Pinterest',
          accessibilityLabel: '',
          role: 'link',
        }}
        title="A Title"
      />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('message + title + primaryAction without href', () => {
    const tree = create(
      <BannerUpsell
        message="Insert a clever upsell message here"
        primaryAction={{
          label: 'Visit Pinterest',
          accessibilityLabel: '',
          role: 'button',
          onClick: () => {},
        }}
        title="A Title"
      />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('message + title + primaryAction + secondaryAction', () => {
    const tree = create(
      <BannerUpsell
        message="Insert a clever upsell message here"
        primaryAction={{
          href: 'pinterest.com',
          label: 'Visit Pinterest',
          accessibilityLabel: '',
          role: 'link',
        }}
        secondaryAction={{
          href: 'pinterest.com/help',
          label: 'Learn more',
          accessibilityLabel: 'Learn more: upsell messages',
          role: 'link',
        }}
        title="A Title"
      />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('message + title + primaryAction + dismissButton', () => {
    const tree = create(
      <BannerUpsell
        message="Insert a clever upsell message here"
        primaryAction={{
          href: 'pinterest.com',
          label: 'Visit Pinterest',
          accessibilityLabel: '',
          role: 'link',
        }}
        dismissButton={{
          accessibilityLabel: 'Dismiss banner',
          onDismiss: () => {},
        }}
        title="A Title"
      />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('message + title + primaryAction + dismissButton + image', () => {
    const tree = create(
      <BannerUpsell
        message="Insert a clever upsell message here"
        primaryAction={{
          href: 'pinterest.com',
          label: 'Visit Pinterest',
          accessibilityLabel: '',
          role: 'link',
        }}
        dismissButton={{
          accessibilityLabel: 'Dismiss banner',
          onDismiss: () => {},
        }}
        title="A Title"
        imageData={{
          component: <Icon icon="pinterest" accessibilityLabel="Pin" color="default" size={32} />,
        }}
      />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('message + title + dismissButton + image + form', () => {
    const tree = create(
      <BannerUpsell
        message="Insert a clever upsell message here"
        dismissButton={{
          accessibilityLabel: 'Dismiss banner',
          onDismiss: () => {},
        }}
        title="A Title"
        imageData={{
          component: <Icon icon="pinterest" accessibilityLabel="Pin" color="default" size={32} />,
        }}
      >
        <BannerUpsell.Form
          onSubmit={() => {}}
          submitButtonText="Submit"
          submitButtonAccessibilityLabel="Submit button"
        >
          <TextField id="name" placeholder="Name" onChange={() => {}} />
        </BannerUpsell.Form>
      </BannerUpsell>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
