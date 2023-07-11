// @flow strict
import { type Node } from 'react';
import { Dropdown, IconButton, Image, PageHeader } from 'gestalt';

export default function IncludeProfilePictureExample(): Node {
  return (
    <PageHeader
      title="My apps"
      subtext="5 total apps"
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
            key="refresh-page"
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
          src="https://i.ibb.co/ZfCZrY8/keerthi.jpg"
        />
      }
    />
  );
}
