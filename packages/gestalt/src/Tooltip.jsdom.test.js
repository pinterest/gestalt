// @flow
import React from 'react';
import { create } from 'react-test-renderer';
import { fireEvent, render } from '@testing-library/react';
import Tooltip from './Tooltip.js';

test('Tooltip renders', () => {
  const component = create(
    <Tooltip text="This is a tooltip">
      <div>Hi</div>
    </Tooltip>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Tooltip renders the hrefText when hovered', () => {
  const { getByRole, getByText } = render(
    <Tooltip
      href="pinterest.com"
      hrefText="Learn more about Pinterest"
      text="This is a tooltip"
    >
      <div>Hi</div>
    </Tooltip>
  );

  fireEvent.mouseEnter(getByRole('tooltip'));
  expect(getByText('Learn more about Pinterest')).toBeVisible();
});

test('Tooltip should render as expected when hovered', () => {
  const { container, getByRole } = render(
    <Tooltip text="This is a tooltip">
      <div>Hi</div>
    </Tooltip>
  );

  fireEvent.mouseEnter(getByRole('tooltip'));
  expect(container.firstChild).toMatchSnapshot();
});
