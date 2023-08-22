// @flow strict
import { type Node, useRef, useState } from 'react';
import { Box, Dropdown, Heading, IconButton, Tooltip } from 'gestalt';

export default function SectionsIconButtonDropdownExample(): Node {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLElement | null>(null);

  return (
    <Box padding={8} height="100%" display="flex" alignItems="center" justifyContent="center">
      <Box width={600}>
        <Heading accessibilityLevel={4}>
          Sugar-Free Strawberry-Chocolate Greek Yogurt Bark Three-Step Recipe.
          <Tooltip inline text="More board options" idealDirection="right" accessibilityLabel="">
            <IconButton
              accessibilityControls="sections-dropdown-example"
              accessibilityHaspopup
              accessibilityExpanded={open}
              accessibilityLabel="More board options"
              bgColor="lightGray"
              icon="ellipsis"
              iconColor="darkGray"
              selected={open}
              onClick={() => setOpen((prevVal) => !prevVal)}
              ref={anchorRef}
              size="sm"
            />
          </Tooltip>
        </Heading>
        {open && (
          <Dropdown
            id="sections-dropdown-example"
            anchor={anchorRef.current}
            onDismiss={() => {
              setOpen(false);
            }}
          >
            <Dropdown.Section label="Board Options">
              <Dropdown.Item onSelect={() => {}} option={{ value: 'edit', label: 'Edit Board' }} />
              <Dropdown.Item onSelect={() => {}} option={{ value: 'share', label: 'Share' }} />
              <Dropdown.Item onSelect={() => {}} option={{ value: 'merge', label: 'Merge' }} />
            </Dropdown.Section>
          </Dropdown>
        )}
      </Box>
    </Box>
  );
}
