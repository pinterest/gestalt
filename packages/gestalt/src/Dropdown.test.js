// @flow strict
import React from 'react';
import { create } from 'react-test-renderer';
import Dropdown from './Dropdown.js';
import Box from './Box.js';
import Button from './Button.js';

function MenuButtonDropdownExample() {
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState(null);
  const anchorRef = React.useRef(null);
  const handleSelect = ({ item }) => {
    setSelected(item);
  };

  return (
    <Box display="flex" justifyContent="center">
      <Button
        accessibilityHaspopup
        iconEnd="arrow-down"
        text="Menu"
        inline
        ref={anchorRef}
        selected={open}
        onClick={() => {
          setOpen(!open);
        }}
      />
      {open && (
        <Dropdown
          anchor={anchorRef.current}
          onDismiss={() => {
            setOpen(false);
          }}
        >
          <Dropdown.Item
            handleSelect={handleSelect}
            selected={selected}
            option={{ value: 'item 1', label: 'Item 1' }}
          />
          <Dropdown.Item
            handleSelect={handleSelect}
            selected={selected}
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
              label:
                'External Item 3 with a really long, detailed, complex name',
            }}
          />
          <Dropdown.Item
            handleSelect={handleSelect}
            selected={selected}
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
      )}
    </Box>
  );
}

describe('Dropdown', () => {
  const Component = MenuButtonDropdownExample();
  it('renders', () => {
    const tree = create(Component).toJSON();
    expect(tree).toMatchSnapshot();
  });

  // it('renders an accessibility label', () => {
  //   const tree = create(
  //     <Dropdown accessibilityLabel="Test Accessibility Label" />
  //   ).toJSON();
  //   expect(tree).toMatchSnapshot();
  // });
});
