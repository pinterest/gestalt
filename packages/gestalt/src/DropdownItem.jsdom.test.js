// @flow strict
import { render, screen } from '@testing-library/react';
import Dropdown from './Dropdown.js';

describe('Dropdown.Item', () => {
  const onSelectMock = jest.fn();

  test('calls onSelect when Item clicked', () => {
    render(
      <Dropdown.Item
        badgeText="New"
        onSelect={onSelectMock}
        option={{ value: 'item 4', label: 'Item 4' }}
      />,
    );
    screen.getByText('Item 4').click();
    expect(onSelectMock).toHaveBeenCalled();
  });

  test('adds badge', () => {
    render(
      <Dropdown.Item
        badgeText="Beta Badge"
        onSelect={onSelectMock}
        option={{ value: 'item 4', label: 'Item 4' }}
      />,
    );
    expect(screen.queryByText('Beta Badge')).toBeInTheDocument();
  });

  test('adds selected icon when item is selected', () => {
    render(
      <Dropdown.Item
        badgeText="New"
        onSelect={onSelectMock}
        option={{ value: 'item 4', label: 'Item 4' }}
        selected={{ value: 'item 4', label: 'Item 4' }}
      />,
    );
    expect(screen.getByRole('img', { name: /Selected Item/i })).toBeInTheDocument();
  });
});
