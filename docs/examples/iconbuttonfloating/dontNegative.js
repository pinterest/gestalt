// @flow strict
import { type Node as ReactNode, useRef, useState } from 'react';
import { Dropdown, Flex, IconButtonFloating } from 'gestalt';

export default function Example(): ReactNode {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<
    $ReadOnlyArray<{ label: string, subtext?: string, value: string }>,
  >([]);
  const anchorRef = useRef<null | HTMLElement>(null);

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
      <IconButtonFloating
        ref={anchorRef}
        accessibilityControls="sections-dropdown-example-negative"
        accessibilityExpanded={open}
        accessibilityLabel="Deletion Menu"
        accessibilityPopupRole="menu"
        icon="trash-can"
        onClick={() => setOpen((prevVal) => !prevVal)}
        selected={open}
        tooltip={{
          text: 'Deletion Menu',
        }}
      />
      {open && (
        <Dropdown
          anchor={anchorRef.current}
          id="sections-dropdown-example-negative"
          onDismiss={() => setOpen(false)}
        >
          <Dropdown.Item
            onSelect={onSelect}
            option={{ value: 'Pin', label: 'This Pin' }}
            selected={selected}
          />
          <Dropdown.Item
            onSelect={onSelect}
            option={{ value: 'Story Pin', label: 'Entire Board' }}
            selected={selected}
          />
        </Dropdown>
      )}
    </Flex>
  );
}
