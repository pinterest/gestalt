// @flow strict
import { type Node, useRef, useState } from 'react';
import { Dropdown, Flex, IconButtonFloating } from 'gestalt';

export default function Example(): Node {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<
    $ReadOnlyArray<{| label: string, subtext?: string, value: string |}>,
  >([]);
  const anchorRef = useRef<null | HTMLElement>(null);

  const onSelect = ({
    item,
  }: {|
    event: SyntheticInputEvent<HTMLInputElement>,
    item: {| label: string, subtext?: string, value: string |},
  |}) => {
    if (selected.some(({ value }) => value === item.value)) {
      setSelected((selectedValue) => selectedValue.filter(({ value }) => value !== item.value));
    } else {
      setSelected((selectedValue) => [...selectedValue, item]);
    }
  };

  return (
    <Flex width="100%" height="100%" justifyContent="center" alignItems="center">
      <IconButtonFloating
        accessibilityControls="sections-dropdown-example-negative"
        accessibilityExpanded={open}
        accessibilityPopupRole="menu"
        accessibilityLabel="Deletion Menu"
        icon="trash-can"
        onClick={() => setOpen((prevVal) => !prevVal)}
        ref={anchorRef}
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
