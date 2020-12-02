// @flow strict
import React from 'react';
import { create } from 'react-test-renderer';
import Icon from './Icon.js';
import Upsell from './Upsell.js';

describe('<Upsell />', () => {
  test('Basic Upsell', () => {
    const tree = create(
      <Upsell message="Insert a clever upsell message here" />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('message + title', () => {
    const tree = create(
      <Upsell message="Insert a clever upsell message here" title="A Title" />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('message + title + primaryLink', () => {
    const tree = create(
      <Upsell
        message="Insert a clever upsell message here"
        primaryLink={{ href: 'pinterest.com', label: 'Visit Pinterest' }}
        title="A Title"
      />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('message + title + primaryLink + secondaryLink', () => {
    const tree = create(
      <Upsell
        message="Insert a clever upsell message here"
        primaryLink={{ href: 'pinterest.com', label: 'Visit Pinterest' }}
        secondaryLink={{ href: 'pinterest.com/help', label: 'Learn more' }}
        title="A Title"
      />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('message + title + primaryLink + dismissButton', () => {
    const tree = create(
      <Upsell
        message="Insert a clever upsell message here"
        primaryLink={{ href: 'pinterest.com', label: 'Visit Pinterest' }}
        dismissButton={{
          accessibilityLabel: 'Dismiss banner',
          onDismiss: () => {},
        }}
        title="A Title"
      />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('message + title + primaryLink + dismissButton + image', () => {
    const tree = create(
      <Upsell
        message="Insert a clever upsell message here"
        primaryLink={{ href: 'pinterest.com', label: 'Visit Pinterest' }}
        dismissButton={{
          accessibilityLabel: 'Dismiss banner',
          onDismiss: () => {},
        }}
        title="A Title"
        image={
          <Icon
            icon="pinterest"
            accessibilityLabel="Pin"
            color="darkGray"
            size={32}
          />
        }
      />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
