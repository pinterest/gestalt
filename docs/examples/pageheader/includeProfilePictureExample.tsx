import { Dropdown, IconButton, Image, PageHeader } from 'gestalt';

export default function IncludeProfilePictureExample() {
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
            key="refresh-page"
            onSelect={() => {}}
            option={{ value: 'Refresh page', label: 'Refresh page' }}
          />,
        ],
      }}
      subtext="5 total apps"
      thumbnail={
        <Image
          alt="square"
          fit="cover"
          naturalHeight={1}
          naturalWidth={1}
          src="https://i.ibb.co/ZfCZrY8/keerthi.jpg"
        />
      }
      title="My apps"
    />
  );
}
