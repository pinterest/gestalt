// @flow strict
import { render, screen } from '@testing-library/react';
import Dropdown from './Dropdown.js';

describe('Dropdown.Link', () => {
  const onClickMock = jest.fn();

  test('calls onClick when Item clicked', () => {
    render(
      <Dropdown.Link
        badgeText="New"
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
        badgeText="New"
        href="https://www.pinterest.com"
        option={{ value: 'item 4', label: 'Item 4' }}
      />,
    );
    expect(screen.getByText('Item 4').closest('a')).toHaveAttribute(
      'href',
      'https://www.pinterest.com',
    );
  });

  test('adds badge and external icon', () => {
    render(
      <Dropdown.Link
        badgeText="Beta Badge"
        href="http://www.pinterest.com"
        isExternal
        onClick={onClickMock}
        option={{ value: 'item 4', label: 'Item 4' }}
      />,
    );
    expect(screen.getByRole('img', { name: /, External/i })).toBeInTheDocument();
    expect(screen.queryByText('Beta Badge')).toBeInTheDocument();
  });
});
