// @flow strict
import React, { type Node } from 'react';
import { Button, Dropdown, Flex } from 'gestalt';
import { type SidebarOrganisedBy } from '../navigationContext.js';
import trackButtonClick from './trackButtonClick.js';

type Props = {|
  onClick: () => void,
  sidebarOrganisedBy: SidebarOrganisedBy,
|};

export default function SidebarCategorizationButton({ onClick, sidebarOrganisedBy }: Props): Node {
  const sidebarOrganisedByObject =
    sidebarOrganisedBy === 'categorized'
      ? { value: 'categorized', label: 'By category' }
      : { value: 'alphabetical', label: 'Alphabetical' };
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState(sidebarOrganisedByObject);
  const anchorRef = React.useRef(null);
  const onSelect = ({ item }) => {
    setSelected(item);
    trackButtonClick('Sidebar Categorization', item.value);
    onClick();
  };

  return (
    <Flex justifyContent="center" alignItems="center" direction="column" flex="grow">
      <Button
        accessibilityControls="action-variant-dropdown-example"
        accessibilityExpanded={open}
        accessibilityHaspopup
        iconEnd="arrow-down"
        fullWidth
        onClick={() => setOpen((prevVal) => !prevVal)}
        ref={anchorRef}
        selected={open}
        size="lg"
        text={sidebarOrganisedByObject.label}
        color="transparent"
      />
      {open && (
        <Dropdown
          anchor={anchorRef.current}
          id="action-variant-dropdown-example"
          onDismiss={() => setOpen(false)}
        >
          <Dropdown.Item
            onSelect={onSelect}
            option={{ value: 'categorized', label: 'By category' }}
            selected={selected}
          />
          <Dropdown.Item
            onSelect={onSelect}
            option={{ value: 'alphabetical', label: 'Alphabetical' }}
            selected={selected}
          />
        </Dropdown>
      )}
    </Flex>
  );
}
