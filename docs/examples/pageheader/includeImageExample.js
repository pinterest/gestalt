// @flow strict
import { type Node as ReactNode } from 'react';
import { Dropdown, IconButton, Image, PageHeader } from 'gestalt';

export default function IncludeImageExample(): ReactNode {
  return (
    <PageHeader
      dropdownAccessibilityLabel="Additional options"
      primaryAction={{
        component: (
          <IconButton
            accessibilityLabel="Refresh page"
            icon="refresh"
            iconColor="darkGray"
            onClick={() => {}}
            size="lg"
            tooltip={{ text: 'Refresh page', idealDirection: 'up' }}
          />
        ),
        dropdownItems: [
          <Dropdown.Item
            key="refresh"
            onSelect={() => {}}
            option={{ value: 'Refresh page', label: 'Refresh page' }}
          />,
        ],
      }}
      subtext="Last updated 5 hours ago"
      thumbnail={
        <Image
          alt="square"
          fit="cover"
          naturalHeight={1}
          naturalWidth={1}
          src="https://i.ibb.co/LQc8ynn/image.png"
        />
      }
      title="Pinterest app"
    />
  );
}
