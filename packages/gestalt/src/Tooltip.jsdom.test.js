// @flow strict
import { create } from 'react-test-renderer';
import { fireEvent, render } from '@testing-library/react';
import Tooltip from './Tooltip.js';
import Link from './Link.js';
import Text from './Text.js';
import { FixedZIndex } from './zIndex.js';

test('Tooltip renders', () => {
  const component = create(
    <Tooltip text="This is a tooltip">
      <div>Hi</div>
    </Tooltip>,
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Tooltip renders the link when hovered', () => {
  const { container, getByText } = render(
    <Tooltip
      link={
        <Link href="https://pinterest.com" target="blank">
          <Text color="white" size="100" weight="bold">
            Learn more
          </Text>
        </Link>
      }
      text="This is a tooltip"
    >
      <div>Hi</div>
    </Tooltip>,
  );

  const ariaContainer = container.querySelector('[aria-label]');
  expect(ariaContainer).not.toBe(null);

  if (ariaContainer) {
    fireEvent.mouseEnter(ariaContainer);
  }
  const { body } = document;
  const element = getByText('Learn more');
  expect(body && body.contains(element)).toBeTruthy();
});

test('Tooltip should render as expected when hovered', () => {
  const { container, getByText } = render(
    <Tooltip text="This is a tooltip">
      <div>Hi</div>
    </Tooltip>,
  );

  const ariaContainer = container.querySelector('[aria-label]');
  expect(ariaContainer).not.toBe(null);

  if (ariaContainer) {
    fireEvent.mouseEnter(ariaContainer);
  }

  expect(getByText('This is a tooltip')).toBeVisible();
});

test('Tooltip renders with idealDirection', () => {
  const component = create(
    <Tooltip text="This is a tooltip" idealDirection="up">
      <div>Hi</div>
    </Tooltip>,
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Tooltip renders with zIndex', () => {
  const fixedZIndex = new FixedZIndex(100);
  const { container, getByText } = render(
    <Tooltip text="This is a tooltip" zIndex={fixedZIndex}>
      <div>Hi</div>
    </Tooltip>,
  );
  const ariaContainer = container.querySelector('[aria-label]');
  expect(ariaContainer).not.toBe(null);

  if (ariaContainer) {
    fireEvent.mouseEnter(ariaContainer);
  }

  const { body } = document;
  const tooltipText = getByText('This is a tooltip');
  const layer = body && body.querySelector('.layer');
  expect(layer && getComputedStyle(layer).zIndex).toEqual('100');
  expect(body && body.contains(tooltipText)).toBe(true);
});
