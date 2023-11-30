// @flow strict
import { type Node as ReactNode } from 'react';
import { Button, Dropdown, PageHeader } from 'gestalt';

export default function OnePrimaryActionExample(): ReactNode {
  return (
    <PageHeader
      title="Audiences"
      primaryAction={{
        component: <Button color="red" size="lg" text="Create audience" />,
        dropdownItems: [
          <Dropdown.Item
            key="create-audience"
            option={{ value: 'Create audience', label: 'Create audience' }}
            onSelect={() => {}}
          />,
        ],
      }}
      dropdownAccessibilityLabel="More options"
    />
  );
}
