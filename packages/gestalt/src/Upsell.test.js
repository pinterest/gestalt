// @flow strict
import React from 'react';
import { create } from 'react-test-renderer';
import Icon from './Icon.js';
import TextField from './TextField.js';
import Upsell from './Upsell.js';

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
        primaryAction={{ href: 'pinterest.com', label: 'Visit Pinterest' }}
        title="A Title"
      />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('message + title + primaryAction without href', () => {
    const tree = create(
      <Upsell
        message="Insert a clever upsell message here"
        primaryAction={{ label: 'Visit Pinterest' }}
        title="A Title"
      />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('message + title + primaryAction + secondaryAction', () => {
    const tree = create(
      <Upsell
        message="Insert a clever upsell message here"
        primaryAction={{ href: 'pinterest.com', label: 'Visit Pinterest' }}
        secondaryAction={{ href: 'pinterest.com/help', label: 'Learn more' }}
        title="A Title"
      />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('message + title + primaryAction + dismissButton', () => {
    const tree = create(
      <Upsell
        message="Insert a clever upsell message here"
        primaryAction={{ href: 'pinterest.com', label: 'Visit Pinterest' }}
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
        primaryAction={{ href: 'pinterest.com', label: 'Visit Pinterest' }}
        dismissButton={{
          accessibilityLabel: 'Dismiss banner',
          onDismiss: () => {},
        }}
        title="A Title"
        imageData={{
          component: <Icon icon="pinterest" accessibilityLabel="Pin" color="darkGray" size={32} />,
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
          component: <Icon icon="pinterest" accessibilityLabel="Pin" color="darkGray" size={32} />,
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
