import { ReactNode } from 'react';
import { Button, Datapoint, Dropdown, PageHeader } from 'gestalt';

export default function PageHeaderLocalizationExample() {
  return (
    <PageHeader
      dropdownAccessibilityLabel="Mehr Optionen"
      helperLink={{
        text: 'Mehr erfahren.',
        accessibilityLabel: 'Erfahren Sie mehr auf Pinterest.com',
        href: 'http://www.pinterest.com',
        onClick: () => {},
      }}
      items={[
        <Datapoint
          key="imporessions"
          size="md"
          title="Impressionen"
          trend={{ value: 30, accessibilityLabel: 'Aufwärtstrend' }}
          value="$1.25M"
        />,
      ]}
      primaryAction={{
        component: <Button color="red" size="lg" text="Fördern" />,
        dropdownItems: [
          <Dropdown.Item
            key="fordern"
            onSelect={() => {}}
            option={{ value: 'Fördern', label: 'Fördern' }}
          />,
        ],
      }}
      secondaryAction={{
        component: <Button size="lg" text="Analysen anzeigen" />,
        dropdownItems: [
          <Dropdown.Link
            key="analysen"
            href="https://pinterest.com"
            option={{ value: 'Analysen anzeigen', label: 'Analysen anzeigen' }}
          />,
        ],
      }}
      subtext="5 aktive Kampagnen."
      title="Anzeigenübersicht"
    />
  );
}
