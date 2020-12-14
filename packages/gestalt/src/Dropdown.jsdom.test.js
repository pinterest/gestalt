// @flow strict
import React from 'react';
import renderer from 'react-test-renderer';
import Dropdown from './Dropdown.js';

const handleSelectMock = jest.fn();
const setOpenMock = jest.fn();
const element = document.createElement('button');
describe('Dropdown', () => {
  const Component = renderer.create(
    <Dropdown
      anchor={element}
      onDismiss={() => {
        setOpenMock(false);
      }}
    >
      <Dropdown.Item
        handleSelect={handleSelectMock}
        option={{ value: 'item 1', label: 'Item 1' }}
      />
      <Dropdown.Item
        handleSelect={handleSelectMock}
        option={{
          value: 'item 2',
          label: 'Item 2 with a really long, detailed, complex name',
        }}
      />
      <Dropdown.Item
        isExternal
        url="https://pinterest.com"
        option={{
          value: 'item 3',
          label: 'External Item 3 with a really long, detailed, complex name',
        }}
      />
      <Dropdown.Item
        handleSelect={handleSelectMock}
        badgeText="New"
        option={{ value: 'item 4', label: 'Item 4' }}
      />
      <Dropdown.Item
        isExternal
        badgeText="New"
        option={{
          value: 'item 5',
          label: 'Item 5 with a really long, detailed name',
        }}
        url="https://pinterest.com"
      />
      <Dropdown.Item
        isExternal
        option={{ value: 'item 6', label: 'Item 6' }}
        url="https://pinterest.com"
      />
    </Dropdown>
  );
  it('renders a menu of 6 items', () => {
    const tree = Component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
