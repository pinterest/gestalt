// @flow strict
import { useState, useRef, type Node } from 'react';
import { Box, IconButton, Flex, Tooltip, Dropdown, Button } from 'gestalt';

export default function Example(): Node {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] =
    useState<?{| label: string, subtext?: string, value: string |}>(null);
  const anchorRef = useRef<null | HTMLButtonElement | HTMLAnchorElement>(null);
  const onSelect = ({
    item,
  }: {|
    event: SyntheticInputEvent<HTMLInputElement>,
    item: {| label: string, subtext?: string, value: string |},
  |}) => setSelected(item);

  return (
    <Box padding={4}>
      <Flex gap={2}>
        <Tooltip text="Go back to previous page">
          <IconButton accessibilityLabel="Back" icon="arrow-back" size="md" />
        </Tooltip>
        <Tooltip text="Send pin">
          <IconButton accessibilityLabel="Share" icon="share" size="md" />
        </Tooltip>
        <Tooltip text="Edit board details">
          <IconButton accessibilityLabel="Edit" icon="edit" size="md" />
        </Tooltip>
        <IconButton
          accessibilityControls="selectlist-dropdown-example3"
          accessibilityExpanded={open}
          accessibilityHaspopup
          accessibilityLabel="Open menu"
          icon="ellipsis"
          onClick={() => setOpen((prevVal) => !prevVal)}
          ref={anchorRef}
          selected={open}
          size="md"
          tooltip={{ text: 'More options' }}
        />
        <Button text="Visit" size="md" />
        <Button color="red" text="Save" size="md" />
        {open && (
          <Dropdown
            anchor={anchorRef.current}
            id="selectlist-dropdown-example3"
            onDismiss={() => setOpen(false)}
          >
            <Dropdown.Item
              onSelect={onSelect}
              option={{ value: 'Download image', label: 'Download image' }}
              selected={selected}
            />
            <Dropdown.Item
              badge={{ text: 'New' }}
              onSelect={onSelect}
              option={{ value: 'Hide Pin', label: 'Hide Pin' }}
              selected={selected}
            />
            <Dropdown.Link
              href="https://pinterest.com"
              isExternal
              option={{ value: 'Report Pin', label: 'Report Pin' }}
            />
            <Dropdown.Item
              onSelect={onSelect}
              option={{ value: 'Delete Pin', label: 'Delete Pin' }}
            />
          </Dropdown>
        )}
      </Flex>
    </Box>
  );
}
