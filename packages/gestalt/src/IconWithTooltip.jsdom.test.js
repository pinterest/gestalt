// @flow
import React from 'react';
import '@babel/polyfill';
import {
  render,
  fireEvent,
  wait,
  waitForElement,
} from '@testing-library/react';
import IconWithTooltip from './IconWithTooltip.js';

test('Icon with Tooltip and no href renders', () => {
  const { getByRole, queryByRole } = render(
    <IconWithTooltip
      accessibilityLabel="informational-tooltip"
      icon="circle-outline"
      inline
      tooltipText="Icon with Tooltip and Learn More link"
    />
  );

  expect(getByRole('img')).toBeVisible();
  fireEvent.mouseEnter(getByRole('img'));
  expect(getByRole('tooltip')).toBeVisible();
  expect(queryByRole('link')).toEqual(null);
});

test('Icon with Tooltip and href renders', () => {
  const { getByRole, getAllByRole } = render(
    <IconWithTooltip
      accessibilityLabel="informational-tooltip"
      icon="circle-outline"
      inline
      tooltipText="Icon with Tooltip and Learn More link"
      href="https://www.pinterest.com"
      hrefText="Learn More"
    />
  );

  expect(getByRole('img')).toBeVisible();
  fireEvent.mouseEnter(getByRole('img'));
  expect(getByRole('tooltip')).toBeVisible();
  expect(getAllByRole('link').length).toEqual(2);
});

test('Icon mouse enter and leave behavior works as expected', async () => {
  const { getByRole, queryByRole } = render(
    <IconWithTooltip
      accessibilityLabel="informational-tooltip"
      icon="circle-outline"
      inline
      tooltipText="Icon with Tooltip and Learn More link"
      href="https://www.pinterest.com"
      hrefText="Learn More"
    />
  );

  // start with just the icon visible
  expect(getByRole('img')).toBeVisible();
  expect(queryByRole('tooltip')).toEqual(null);

  // hover on icon - tooltip should appear
  fireEvent.mouseEnter(getByRole('img'));
  await waitForElement(() => getByRole('tooltip'));

  // leave icon, hover on tooltip - tooltip should remain visible
  fireEvent.mouseLeave(getByRole('img'));
  fireEvent.mouseEnter(getByRole('tooltip'));
  expect(getByRole('tooltip')).toBeVisible();

  // leave tooltip, hover on icon - tooltip should remain visible
  fireEvent.mouseLeave(getByRole('tooltip'));
  fireEvent.mouseEnter(getByRole('img'));
  expect(getByRole('tooltip')).toBeVisible();

  // leave tooltip, leave icon - tooltip should no longer be visible
  fireEvent.mouseLeave(getByRole('img'));
  await wait(() => expect(queryByRole('tooltip')).toEqual(null));
});

test('Icon with Tooltip and href but missing href text renders', () => {
  const { getByRole, queryByRole } = render(
    <IconWithTooltip
      accessibilityLabel="informational-tooltip"
      icon="circle-outline"
      inline
      tooltipText="Icon with Tooltip and Learn More link"
      href="https://www.pinterest.com"
    />
  );

  expect(getByRole('img')).toBeVisible();
  fireEvent.mouseEnter(getByRole('img'));
  expect(getByRole('tooltip')).toBeVisible();
  expect(queryByRole('link')).toEqual(null);
});
