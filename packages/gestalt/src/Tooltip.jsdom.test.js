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
  const { getByRole } = render(
    <Tooltip
      href="pinterest.com"
      hrefText="learn more"
      text="This is a tooltip"
    >
      <div>Hi</div>
    </Tooltip>
  );

  fireEvent.mouseEnter(getByRole('tooltip-container'));
  expect(getByRole('href-link')).toBeVisible();
});

test('Tooltip does not render the hrefText when hovered', () => {
  const { getByRole, queryByRole } = render(
    <Tooltip text="This is a tooltip">
      <div>Hi</div>
    </Tooltip>
  );

  fireEvent.mouseEnter(getByRole('tooltip-container'));
  expect(queryByRole('href-link')).toBeNull();
});
