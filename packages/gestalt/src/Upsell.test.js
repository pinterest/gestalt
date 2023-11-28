// @flow strict
import { create } from 'react-test-renderer';
import Icon from './Icon';
import TextField from './TextField';
import Upsell from './Upsell';

describe('<Upsell />', () => {
  test('Basic Upsell', () => {
    const tree = create(<Upsell message="Insert a clever upsell message here" />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('message + title', () => {
    const tree = create(
      <Upsell message="Insert a clever upsell message here" title="A Title" />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('message + title + primaryAction with href', () => {
    const tree = create(
      <Upsell
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
      <Upsell
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
      <Upsell
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
      <Upsell
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
      <Upsell
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
      <Upsell
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
        <Upsell.Form
          onSubmit={() => {}}
          submitButtonText="Submit"
          submitButtonAccessibilityLabel="Submit button"
        >
          <TextField id="name" placeholder="Name" onChange={() => {}} />
        </Upsell.Form>
      </Upsell>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
