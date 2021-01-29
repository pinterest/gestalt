// @flow strict
import React from 'react';
import { render, screen } from '@testing-library/react';
import Dropdown from './Dropdown.js';

describe('DropdownItem', () => {
  const handleSelectMock = jest.fn();
  test('calls handleSelect when Item clicked', () => {
    render(
      <Dropdown.Item
        handleSelect={handleSelectMock}
        badgeText="New"
        option={{ value: 'item 4', label: 'Item 4' }}
      />,
    );
    screen.getByText('Item 4').click();
    expect(handleSelectMock).toHaveBeenCalled();
  });

  test('creates an anchor when href is passed', () => {
    render(
      <Dropdown.Item
        handleSelect={handleSelectMock}
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
      <Dropdown.Item
        handleSelect={handleSelectMock}
        badgeText="Beta Badge"
        isExternal
        option={{ value: 'item 4', label: 'Item 4' }}
      />,
    );
    expect(screen.getByRole('img', { name: /, External/i })).toBeInTheDocument();
    expect(screen.queryByText('Beta Badge')).toBeInTheDocument();
  });

  test('adds selected icon when item is selected', () => {
    render(
      <Dropdown.Item
        handleSelect={handleSelectMock}
        badgeText="New"
        selected={{ value: 'item 4', label: 'Item 4' }}
        option={{ value: 'item 4', label: 'Item 4' }}
      />,
    );
    expect(screen.getByRole('img', { name: /Selected Item/i })).toBeInTheDocument();
  });
});
