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
        dismissButton={{
          accessibilityLabel: 'Dismiss banner',
          onDismiss: () => {},
        }}
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

  test('message + title + primaryAction + dismissButton + image', () => {
    const tree = create(
      <BannerUpsell
        dismissButton={{
          accessibilityLabel: 'Dismiss banner',
          onDismiss: () => {},
        }}
        imageData={{
          component: <Icon accessibilityLabel="Pin" color="default" icon="pinterest" size={32} />,
        }}
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

  test('message + title + dismissButton + image + form', () => {
    const tree = create(
      <BannerUpsell
        dismissButton={{
          accessibilityLabel: 'Dismiss banner',
          onDismiss: () => {},
        }}
        imageData={{
          component: <Icon accessibilityLabel="Pin" color="default" icon="pinterest" size={32} />,
        }}
        message="Insert a clever upsell message here"
        title="A Title"
      >
        <BannerUpsell.Form
          onSubmit={() => {}}
          submitButtonAccessibilityLabel="Submit button"
          submitButtonText="Submit"
        >
          <TextField id="name" onChange={() => {}} placeholder="Name" />
        </BannerUpsell.Form>
      </BannerUpsell>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('validate data test id and message + title + dismissButton + image + form', () => {
    const component = create(
      <BannerUpsell
        dataTestId="test"
        dismissButton={{
          accessibilityLabel: 'Dismiss banner',
          onDismiss: () => {},
        }}
        imageData={{
          component: <Icon accessibilityLabel="Pin" color="default" icon="pinterest" size={32} />,
        }}
        message="Insert a clever upsell message here"
        title="A Title"
      >
        <BannerUpsell.Form
          onSubmit={() => {}}
          submitButtonAccessibilityLabel="Submit button"
          submitButtonText="Submit"
        >
          <TextField id="name" onChange={() => {}} placeholder="Name" />
        </BannerUpsell.Form>
      </BannerUpsell>,
    ).root;
    expect(
      component
        .findAll((element) => element.type === 'div')
        .filter((node) => node.props['data-test-id'] === 'test'),
    ).toHaveLength(1);
  });
});
