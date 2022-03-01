// @flow strict
import React, { type Node } from 'react';
import { Button, Dropdown, Flex, Fieldset, RadioButton } from 'gestalt';
import { type SidebarOrganisedBy } from '../navigationContext.js';
import trackButtonClick from './trackButtonClick.js';

type Props = {|
  onClick: () => void,
  sidebarOrganisedBy: SidebarOrganisedBy,
|};

export default function SidebarCategorizationButton({ onClick, sidebarOrganisedBy }: Props): Node {
  // const sidebarOrganisedByObject =
  //   sidebarOrganisedBy === 'categorized'
  //     ? { value: 'categorized', label: 'By category' }
  //     : { value: 'alphabetical', label: 'Alphabetical' };
  // const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState(sidebarOrganisedBy);
  // const anchorRef = React.useRef(null);
  const onSelect = ({ event }) => {
    setSelected(event.target.value);
    trackButtonClick('Sidebar Categorization', event.target.value);
    onClick();
  };

  return (
    // <Flex justifyContent="center" alignItems="center" direction="column" flex="grow">
    //   <Button
    //     accessibilityControls="action-variant-dropdown-example"
    //     accessibilityExpanded={open}
    //     accessibilityHaspopup
    //     iconEnd="arrow-down"
    //     fullWidth
    //     onClick={() => setOpen((prevVal) => !prevVal)}
    //     ref={anchorRef}
    //     selected={open}
    //     size="lg"
    //     text={sidebarOrganisedByObject.label}
    //     color="transparent"
    //   />
    //   {open && (
    //     <Dropdown
    //       anchor={anchorRef.current}
    //       id="action-variant-dropdown-example"
    //       onDismiss={() => setOpen(false)}
    //     >
    //       <Dropdown.Item
    //         onSelect={onSelect}
    //         option={{ value: 'categorized', label: 'By category' }}
    //         selected={selected}
    //       />
    //       <Dropdown.Item
    //         onSelect={onSelect}
    //         option={{ value: 'alphabetical', label: 'Alphabetical' }}
    //         selected={selected}
    //       />
    //     </Dropdown>
    //   )}
    // </Flex>

    <Fieldset legend="Sort by">
      <Flex gap={2}>
        <RadioButton
          checked={selected === 'categorized'}
          id="favoritePizza"
          label="Category"
          name="sidebarSort"
          onChange={onSelect}
          value="categorized"
          size="sm"
        />
        <RadioButton
          checked={selected === 'alphabetical'}
          id="favoriteCurry"
          label="Alphabetical"
          name="sidebarSort"
          onChange={onSelect}
          value="alphabetical"
          size="sm"
        />
      </Flex>
    </Fieldset>
  );
}
