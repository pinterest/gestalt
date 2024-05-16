import { ReactNode, useRef, useState } from 'react';
import { Box, Dropdown, Heading, IconButton, Tooltip } from 'gestalt';

export default function SectionsIconButtonDropdownExample() {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLElement | null>(null);

  return (
    <Box alignItems="center" display="flex" height="100%" justifyContent="center" padding={8}>
      <Box width={600}>
        <Heading accessibilityLevel={4}>
          Sugar-Free Strawberry-Chocolate Greek Yogurt Bark Three-Step Recipe.
          <Tooltip accessibilityLabel="" idealDirection="right" inline text="More board options">
            <IconButton
              // @ts-expect-error - TS2322 - Type 'MutableRefObject<HTMLElement | null>' is not assignable to type 'LegacyRef<HTMLButtonElement> | undefined'.
              ref={anchorRef}
              accessibilityControls="sections-dropdown-example"
              accessibilityExpanded={open}
              accessibilityHaspopup
              accessibilityLabel="More board options"
              bgColor="lightGray"
              icon="ellipsis"
              iconColor="darkGray"
              onClick={() => setOpen((prevVal) => !prevVal)}
              selected={open}
              size="sm"
            />
          </Tooltip>
        </Heading>
        {open && (
          <Dropdown
            anchor={anchorRef.current}
            id="sections-dropdown-example"
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
