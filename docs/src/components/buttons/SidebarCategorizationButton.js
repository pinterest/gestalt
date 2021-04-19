// @flow strict
import type { Node } from 'react';
import { Flex, IconButton, Tooltip } from 'gestalt';
// eslint-disable-next-line import/no-relative-parent-imports
import { type SidebarOrganisedBy } from '../navigationContext.js';
import trackButtonClick from './trackButtonClick.js';

type Props = {|
  onClick: () => void,
  sidebarOrganisedBy: SidebarOrganisedBy,
|};

export default function SidebarCategorizationButton({ onClick, sidebarOrganisedBy }: Props): Node {
  const sidebarOrganisedByCopy =
    sidebarOrganisedBy === 'categorized' ? 'Alphabetical' : 'Categorize';

  return (
    <Tooltip inline text={`Sidebar: ${sidebarOrganisedByCopy}`}>
      <Flex alignItems="center">
        <IconButton
          accessibilityLabel="Toggle sidebar categorization"
          icon={sidebarOrganisedBy === 'categorized' ? 'arrow-circle-down' : 'folder'}
          iconColor="white"
          onClick={() => {
            trackButtonClick('Sidebar Categorization', sidebarOrganisedByCopy);
            onClick();
          }}
          size="md"
        />
      </Flex>
    </Tooltip>
  );
}
