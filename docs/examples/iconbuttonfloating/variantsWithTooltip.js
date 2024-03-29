// @flow strict
import { type Node as ReactNode, useRef, useState } from 'react';
import { Box, Dropdown, Flex, IconButtonFloating } from 'gestalt';

export default function Example(): ReactNode {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<
    $ReadOnlyArray<{ label: string, subtext?: string, value: string }>,
  >([]);
  const anchorRef = useRef<null | HTMLAnchorElement | HTMLButtonElement>(null);

  const onSelect = ({
    item,
  }: {
    event: SyntheticInputEvent<HTMLInputElement>,
    item: { label: string, subtext?: string, value: string },
  }) => {
    if (selected.some(({ value }) => value === item.value)) {
      setSelected((selectedValue) => selectedValue.filter(({ value }) => value !== item.value));
    } else {
      setSelected((selectedValue) => [...selectedValue, item]);
    }
  };

  return (
    <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
      <Box role="contentinfo">
        <IconButtonFloating
          ref={anchorRef}
          accessibilityControls="sections-dropdown-example"
          accessibilityExpanded={open}
          accessibilityLabel="Create Pin Menu"
          accessibilityPopupRole="menu"
          icon="add"
          onClick={() => setOpen((prevVal) => !prevVal)}
          selected={open}
          tooltip={{
            text: 'Create Pin Menu',
          }}
        />
      </Box>

      {open && (
        <Dropdown
          anchor={anchorRef.current}
          id="sections-dropdown-example"
          onDismiss={() => setOpen(false)}
        >
          <Dropdown.Section label="Create">
            <Dropdown.Item
              onSelect={onSelect}
              option={{ value: 'Pin', label: 'Pin' }}
              selected={selected}
            />
            <Dropdown.Item
              onSelect={onSelect}
              option={{ value: 'Story Pin', label: 'Story Pin' }}
              selected={selected}
            />
          </Dropdown.Section>
          <Dropdown.Section label="Add">
            <Dropdown.Item
              badge={{ text: 'New' }}
              onSelect={onSelect}
              option={{ value: 'Note', label: 'Note' }}
              selected={selected}
            />
            <Dropdown.Item
              onSelect={onSelect}
              option={{ value: 'Section', label: 'Section' }}
              selected={selected}
            />
          </Dropdown.Section>
        </Dropdown>
      )}
    </Flex>
  );
}
