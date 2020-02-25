// @flow
import React from 'react';
import { create } from 'react-test-renderer';
import { fireEvent, render } from '@testing-library/react';
import Tooltip from './Tooltip.js';
import Link from './Link.js';
import Text from './Text.js';

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
  const { container, getByRole, getByText } = render(
    <Tooltip
      link={
        <Link href="https://pinterest.com" target="blank">
          <Text color="white" size="sm" weight="bold">
            Learn more about logout
          </Text>
        </Link>
      }
      text="This is a tooltip"
    >
      <div>Hi</div>
    </Tooltip>
  );

  fireEvent.mouseEnter(getByRole('tooltip'));
  expect(getByText('Learn more about logout')).toBeVisible();
  expect(container.firstChild).toMatchSnapshot();
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
