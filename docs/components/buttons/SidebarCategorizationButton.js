// @flow strict
import React, { type Node } from 'react';
import { Flex, Fieldset, RadioButton } from 'gestalt';
import { type SidebarOrganisedBy } from '../navigationContext.js';
import trackButtonClick from './trackButtonClick.js';

type Props = {|
  onClick: () => void,
  sidebarOrganisedBy: SidebarOrganisedBy,
|};

export default function SidebarCategorizationButton({ onClick, sidebarOrganisedBy }: Props): Node {
  const [selected, setSelected] = React.useState(sidebarOrganisedBy);
  const onSelect = ({ event }) => {
    setSelected(event.target.value);
    trackButtonClick('Sidebar Categorization', event.target.value);
    onClick();
  };

  return (
    <Fieldset legend="Sort by">
      <Flex gap={2}>
        <RadioButton
          checked={selected === 'categorized'}
          id="sortCategory"
          label="Category"
          name="sidebarSort"
          onChange={onSelect}
          value="categorized"
          size="sm"
        />
        <RadioButton
          checked={selected === 'alphabetical'}
          id="sortAlphabetical"
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
