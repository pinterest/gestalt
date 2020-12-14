// @flow strict
import React from 'react';
import { create } from 'react-test-renderer';

import { render } from '@testing-library/react';
import Dropdown from './Dropdown.js';
import Icon from './Icon.js';

describe('DropdownItem', () => {
  const handleSelectMock = jest.fn();
  test('calls handleSelect when Item clicked', () => {
    const { getByText } = render(
      <Dropdown.Item
        handleSelect={handleSelectMock}
        badgeText="New"
        option={{ value: 'item 4', label: 'Item 4' }}
      />
    );
    getByText('Item 4').click();
    expect(handleSelectMock).toHaveBeenCalled();
  });

  test('creates an anchor when url is passed', () => {
    const { getByText } = render(
      <Dropdown.Item
        handleSelect={handleSelectMock}
        badgeText="New"
        url="https://www.pinterest.com"
        option={{ value: 'item 4', label: 'Item 4' }}
      />
    );
    expect(getByText('Item 4').closest('a')).toHaveAttribute(
      'href',
      'https://www.pinterest.com'
    );
  });

  test('adds badge and external icon', () => {
    const instance = create(
      <Dropdown.Item
        handleSelect={handleSelectMock}
        badgeText="New"
        isExternal
        option={{ value: 'item 4', label: 'Item 4' }}
      />
    ).root;
    expect(instance.findByType(Icon).props.icon).toBe('arrow-up-right');
  });
  test('adds selected icon when item is selected', () => {
    const instance = create(
      <Dropdown.Item
        handleSelect={handleSelectMock}
        badgeText="New"
        selected={{ value: 'item 4', label: 'Item 4' }}
        option={{ value: 'item 4', label: 'Item 4' }}
      />
    ).root;
    expect(instance.findByType(Icon).props.icon).toBe('check');
  });
});
