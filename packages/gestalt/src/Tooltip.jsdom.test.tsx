import { create } from 'react-test-renderer';
import { fireEvent, render, screen } from '@testing-library/react';
import Link from './Link';
import Text from './Text';
import Tooltip from './Tooltip';
import { FixedZIndex } from './zIndex';

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
  const { container } = render(
    <Tooltip
      link={
        <Link href="https://pinterest.com" target="blank">
          <Text color="inverse" size="100" weight="bold">
            Learn more
          </Text>
        </Link>
      }
      text="This is a tooltip"
    >
      <div>Hi</div>
    </Tooltip>,
  );

  // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access -- Please fix the next time this file is touched!
  const ariaContainer = container.querySelector('[aria-label]');
  expect(ariaContainer).not.toBe(null);

  if (ariaContainer) {
    fireEvent.mouseEnter(ariaContainer);
  }
  const { body } = document;

  expect(body && body.contains(screen.getByText('Learn more'))).toBeTruthy();
});

test('Tooltip should render as expected when hovered', () => {
  const { container } = render(
    <Tooltip text="This is a tooltip">
      <div>Hi</div>
    </Tooltip>,
  );

  // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access -- Please fix the next time this file is touched!
  const ariaContainer = container.querySelector('[aria-label]');
  expect(ariaContainer).not.toBe(null);

  if (ariaContainer) {
    fireEvent.mouseEnter(ariaContainer);
  }

  expect(screen.getByText('This is a tooltip')).toBeVisible();
});

test('Tooltip renders with idealDirection', async () => {
  const { container } = render(
    <Tooltip idealDirection="up" text="This is a tooltip">
      <div>Hi</div>
    </Tooltip>,
  );

  // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access -- Please fix the next time this file is touched!
  const ariaContainer = container.querySelector('[aria-label]');
  expect(ariaContainer).not.toBe(null);

  if (ariaContainer) {
    fireEvent.mouseEnter(ariaContainer);
  }

  expect(screen.getByText('This is a tooltip')).toBeVisible();
});

test('Tooltip renders with zIndex', () => {
  const fixedZIndex = new FixedZIndex(100);
  const { container } = render(
    <Tooltip text="This is a tooltip" zIndex={fixedZIndex}>
      <div>Hi</div>
    </Tooltip>,
  );
  // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access -- Please fix the next time this file is touched!
  const ariaContainer = container.querySelector('[aria-label]');
  expect(ariaContainer).not.toBe(null);

  if (ariaContainer) {
    fireEvent.mouseEnter(ariaContainer);
  }

  const { body } = document;

  // eslint-disable-next-line testing-library/no-node-access -- Please fix the next time this file is touched!
  const layer = body && body.querySelector('.layer');
  expect(layer && getComputedStyle(layer).zIndex).toEqual('100');
  expect(body && body.contains(screen.getByText('This is a tooltip'))).toBe(true);
});
