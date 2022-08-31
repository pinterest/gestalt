// @flow strict
import React, { type Node } from 'react';
import { Button, Dropdown, PageHeader } from 'gestalt';
import LINKS from '../../docs-components/LINK_REPOSITORY.js';

export default function IncludeImageExample(): Node {
  return (
    <PageHeader
      title="Create product group"
      subtext="2,131 catalog products."
      helperLink={{
        accessibilityLabel: '',
        text: 'Learn more about bulk product catalog uploads.',
        href: LINKS.PINTEREST_CANONICAL,
        onClick: () => {},
      }}
      primaryAction={{
        component: <Button color="red" size="lg" text="Quick create" />,
        dropdownItems: [
          <Dropdown.Item
            key="quick-create"
            option={{ value: 'Quick create', label: 'Quick create' }}
            onSelect={() => {}}
          />,
        ],
      }}
      dropdownAccessibilityLabel="Additional options"
    />
  );
}
