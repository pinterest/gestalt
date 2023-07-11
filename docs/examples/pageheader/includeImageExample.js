// @flow strict
import { type Node } from 'react';
import { Dropdown, IconButton, Image, PageHeader } from 'gestalt';

export default function IncludeImageExample(): Node {
  return (
    <PageHeader
      title="Pinterest app"
      subtext="Last updated 5 hours ago"
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
            option={{ value: 'Refresh page', label: 'Refresh page' }}
            onSelect={() => {}}
          />,
        ],
      }}
      dropdownAccessibilityLabel="Additional options"
      thumbnail={
        <Image
          alt="square"
          fit="cover"
          naturalHeight={1}
          naturalWidth={1}
          src="https://i.ibb.co/LQc8ynn/image.png"
        />
      }
    />
  );
}
