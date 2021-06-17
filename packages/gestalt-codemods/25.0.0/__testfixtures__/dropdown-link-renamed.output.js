// @flow strict
import { useRef, useState } from 'react';
import { Button, Dropdown as Renamed, Flex } from 'gestalt';

export default function IntroMenuButtonDropdownExample() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const anchorRef = useRef(null);
  const handleSelect = ({ item }) => setSelected(item);

  return (
    <Flex justifyContent="center">
      <Button
        accessibilityControls="demo-dropdown-example"
        accessibilityExpanded={open}
        accessibilityHaspopup
        iconEnd="arrow-down"
        inline
        onClick={() => setOpen((prevVal) => !prevVal)}
        ref={anchorRef}
        selected={open}
        size="lg"
        text="Menu"
      />

      {open && (
        <Renamed
          anchor={anchorRef.current}
          id="demo-dropdown-example"
          onDismiss={() => setOpen(false)}>
          <Renamed.Item
            onSelect={handleSelect}
            option={{ value: "item 1", label: "Item 1" }}
            selected={selected}
          />
          <Renamed.Item
            onSelect={handleSelect}
            option={{ value: "item 2", label: "Item 2 with a really long, detailed, complex name" }}
            selected={selected}
          />
          <Renamed.Link
            href="https://pinterest.com"
            isExternal
            option={{ value: "item 3", label: "Item 3 with a really long, detailed, complex name" }} />
          <Renamed.Item
            badgeText="New"
            onSelect={handleSelect}
            option={{ value: "item 4", label: "Item 4" }}
            selected={selected}
          />
          <Renamed.Link
            badgeText="New"
            href="https://pinterest.com"
            isExternal
            option={{ value: "item 5", label: "Item 5 with a really long, detailed name" }}
          />
          <Renamed.Link
            href="/typeahead"
            onClick={() => {}}
            option={{ value: "item 6", label: "Item 6 navigates internally" }}
          />
        </Renamed>
      )}
    </Flex>
  );
}
