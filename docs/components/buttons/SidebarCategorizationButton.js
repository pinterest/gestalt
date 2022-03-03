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
  const onSelect = ({ event }) => {
    trackButtonClick('Sidebar Categorization', event.target.value);
    onClick();
  };

  return (
    <Fieldset legend="Sort by">
      <Flex gap={2}>
        <RadioButton
          checked={sidebarOrganisedBy === 'categorized'}
          id="sortCategory"
          label="Category"
          name="sidebarSort"
          onChange={onSelect}
          value="categorized"
          size="sm"
        />
        <RadioButton
          checked={sidebarOrganisedBy === 'alphabetical'}
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
