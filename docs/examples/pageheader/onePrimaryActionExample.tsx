import {ReactNode} from 'react';
import { Button, Dropdown, PageHeader } from 'gestalt';

export default function OnePrimaryActionExample() {
  return (
    <PageHeader
      dropdownAccessibilityLabel="More options"
      primaryAction={{
        component: <Button color="red" size="lg" text="Create audience" />,
        dropdownItems: [
          <Dropdown.Item
            key="create-audience"
            onSelect={() => {}}
            option={{ value: 'Create audience', label: 'Create audience' }}
          />,
        ],
      }}
      title="Audiences"
    />
  );
}
