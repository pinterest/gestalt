// @flow
import React from 'react';
import renderer from 'react-test-renderer';
import IconWithTooltip from './IconWithTooltip.js';

test('IconWithTooltip renders', () => {
  const component = renderer.create(
    <IconWithTooltip
      accessibilityLabel="informational-tooltip"
      icon="circle-outline"
      inline
      tooltipText="Icon with Tooltip and Learn More link"
    />
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('IconWithTooltip renders with href', () => {
  const component = renderer.create(
    <IconWithTooltip
      accessibilityLabel="informational-tooltip"
      icon="circle-outline"
      inline
      tooltipText="Icon with Tooltip and Learn More link"
      href="https://www.pinterest.com"
      hrefText="Learn More"
    />
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('IconWithTooltip renders with missing hrefText', () => {
  const component = renderer.create(
    <IconWithTooltip
      accessibilityLabel="informational-tooltip"
      icon="circle-outline"
      inline
      tooltipText="Icon with Tooltip and Learn More link"
      href="https://www.pinterest.com"
    />
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
