// @flow strict
import { render, screen } from '@testing-library/react';
import Dropdown from './Dropdown.js';

describe('Dropdown.Link', () => {
  const onClickMock = jest.fn<
    [
      {|
        dangerouslyDisableOnNavigation: () => void,
        event: SyntheticMouseEvent<HTMLAnchorElement> | SyntheticKeyboardEvent<HTMLAnchorElement>,
        mobileOnDismissStart: () => void,
      |},
    ],
    void,
  >();

  test('calls onClick when Item clicked', () => {
    render(
      <Dropdown.Link
        badge={{ text: 'New' }}
        href="/somePath"
        onClick={onClickMock}
        option={{ value: 'item 4', label: 'Item 4' }}
      />,
    );
    screen.getByText('Item 4').click();
    expect(onClickMock).toHaveBeenCalled();
  });

  test('creates an anchor when href is passed', () => {
    render(
      <Dropdown.Link
        onClick={onClickMock}
        badge={{ text: 'New' }}
        href="https://www.pinterest.com"
        option={{ value: 'item 4', label: 'Item 4' }}
      />,
    );
    // eslint-disable-next-line testing-library/no-node-access -- Please fix the next time this file is touched!
    expect(screen.getByText('Item 4').closest('a')).toHaveAttribute(
      'href',
      'https://www.pinterest.com',
    );
  });

  test('adds badge and external icon', () => {
    render(
      <Dropdown.Link
        badge={{ text: 'Beta Badge' }}
        href="http://www.pinterest.com"
        isExternal
        onClick={onClickMock}
        option={{ value: 'item 4', label: 'Item 4' }}
      />,
    );
    expect(screen.getByRole('img', { hidden: true })).toBeInTheDocument();
    // eslint-disable-next-line testing-library/prefer-presence-queries -- Please fix the next time this file is touched!
    expect(screen.queryByText('Beta Badge')).toBeInTheDocument();
    expect(
      screen.queryByText('; Opens a new tab', {
        exact: true,
      }),
    ).toBeVisible();
  });
});
