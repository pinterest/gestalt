import { useRef, useState } from 'react';
import { Box, Button, Dropdown, Flex, IconButton, Tooltip } from 'gestalt';

export default function Example() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<
    | {
        label: string;
        subtext?: string;
        value: string;
      }
    | null
    | undefined
  >(null);
  const anchorRef = useRef<null | HTMLButtonElement | HTMLAnchorElement>(null);
  const onSelect = ({
    item,
  }: {
    event: React.ChangeEvent<HTMLInputElement>;
    item: {
      label: string;
      subtext?: string;
      value: string;
    };
  }) => setSelected(item);

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
          // @ts-expect-error - TS2322 - Type 'MutableRefObject<HTMLAnchorElement | HTMLButtonElement | null>' is not assignable to type 'LegacyRef<HTMLButtonElement> | undefined'.
          ref={anchorRef}
          accessibilityControls="selectlist-dropdown-example3"
          accessibilityExpanded={open}
          accessibilityHaspopup
          accessibilityLabel="Open menu"
          icon="ellipsis"
          onClick={() => setOpen((prevVal) => !prevVal)}
          selected={open}
          size="md"
          tooltip={{ text: 'More options' }}
        />
        <Button size="md" text="Visit" />
        <Button color="red" size="md" text="Save" />
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
              iconEnd="visit"
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
