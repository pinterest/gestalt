// @flow strict
import React from 'react';
import { create } from 'react-test-renderer';
import Callout from './Callout.js';

describe('<Callout />', () => {
  test('Error Callout', () => {
    const tree = create(
      <Callout
        description="Insert a clever error callout message here"
        iconAccessibilityLabel="error icon"
        type="error"
      />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('Warning Callout', () => {
    const tree = create(
      <Callout
        description="Insert a clever warning callout message here"
        iconAccessibilityLabel="warning icon"
        type="warning"
      />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('Info Callout', () => {
    const tree = create(
      <Callout
        description="Insert a clever info callout message here"
        iconAccessibilityLabel="info icon"
        type="info"
      />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('description + title', () => {
    const tree = create(
      <Callout
        description="Insert a clever info callout message here"
        iconAccessibilityLabel="info icon"
        type="info"
        title="A Title"
      />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('description + title + primaryLink', () => {
    const tree = create(
      <Callout
        description="Insert a clever info callout message here"
        iconAccessibilityLabel="info icon"
        primaryLink={{ href: 'pinterest.com', label: 'Visit Pinterest' }}
        type="info"
        title="A Title"
      />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('description + title + primaryLink + secondaryLink', () => {
    const tree = create(
      <Callout
        description="Insert a clever info callout message here"
        iconAccessibilityLabel="info icon"
        primaryLink={{ href: 'pinterest.com', label: 'Visit Pinterest' }}
        secondaryLink={{ href: 'pinterest.com/help', label: 'Learn more' }}
        type="info"
        title="A Title"
      />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('description + title + primaryLink + dismissButton', () => {
    const tree = create(
      <Callout
        description="Insert a clever info callout message here"
        iconAccessibilityLabel="info icon"
        primaryLink={{ href: 'pinterest.com', label: 'Visit Pinterest' }}
        dismissButton={{
          accessibilityLabel: 'Dismiss banner',
          onDismiss: () => {},
        }}
        type="info"
        title="A Title"
      />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
